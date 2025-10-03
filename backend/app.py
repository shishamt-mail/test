from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

MONGO_URI = "mongodb+srv://Daksh:Shishamt7894@cluster0.avgzcuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['daksh_footwear']

brands_collection = db['brands']
products_collection = db['products']
messages_collection = db['messages']
settings_collection = db['settings']

ADMIN_USERNAME = "shishamt"
ADMIN_PASSWORD = "Shishamt7894"

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.authorization
        if not auth or auth.username != ADMIN_USERNAME or auth.password != ADMIN_PASSWORD:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        client.admin.command('ping')
        return jsonify({'status': 'healthy', 'database': 'connected'}), 200
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

@app.route('/api/brands', methods=['GET'])
def get_brands():
    try:
        brands = list(brands_collection.find({'visible': True}).sort('order', 1))
        brands = [serialize_doc(brand) for brand in brands]
        return jsonify(brands), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/brands/all', methods=['GET'])
@admin_required
def get_all_brands():
    try:
        brands = list(brands_collection.find().sort('order', 1))
        brands = [serialize_doc(brand) for brand in brands]
        return jsonify(brands), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/brands', methods=['POST'])
@admin_required
def create_brand():
    try:
        data = request.json
        print(f"Received brand data: {data}")
        brand = {
            'name': data['name'],
            'slug': data['slug'],
            'logo_url': data['logo_url'],
            'banner_url': data['banner_url'],
            'description': data['description'],
            'visible': data.get('visible', True),
            'in_navbar': data.get('in_navbar', False),
            'order': data.get('order', 0),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        print(f"Inserting brand: {brand}")
        result = brands_collection.insert_one(brand)
        brand['_id'] = str(result.inserted_id)
        print(f"Brand created successfully with ID: {brand['_id']}")
        return jsonify(brand), 201
    except Exception as e:
        print(f"Error creating brand: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/brands/<brand_id>', methods=['PUT'])
@admin_required
def update_brand(brand_id):
    try:
        data = request.json
        update_data = {
            'name': data['name'],
            'slug': data['slug'],
            'logo_url': data['logo_url'],
            'banner_url': data['banner_url'],
            'description': data['description'],
            'visible': data.get('visible', True),
            'in_navbar': data.get('in_navbar', False),
            'order': data.get('order', 0),
            'updated_at': datetime.utcnow()
        }
        result = brands_collection.update_one(
            {'_id': ObjectId(brand_id)},
            {'$set': update_data}
        )
        if result.matched_count == 0:
            return jsonify({'error': 'Brand not found'}), 404
        return jsonify({'message': 'Brand updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/brands/<brand_id>', methods=['DELETE'])
@admin_required
def delete_brand(brand_id):
    try:
        result = brands_collection.delete_one({'_id': ObjectId(brand_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Brand not found'}), 404
        return jsonify({'message': 'Brand deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        brand = request.args.get('brand')
        category = request.args.get('category')
        search = request.args.get('search')

        query = {'status': {'$ne': 'hidden'}}

        if brand:
            query['brand'] = brand
        if category:
            query['category'] = category
        if search:
            query['$or'] = [
                {'name': {'$regex': search, '$options': 'i'}},
                {'description': {'$regex': search, '$options': 'i'}}
            ]

        products = list(products_collection.find(query).sort('created_at', -1))
        products = [serialize_doc(product) for product in products]
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = products_collection.find_one({'_id': ObjectId(product_id)})
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(serialize_doc(product)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
@admin_required
def create_product():
    try:
        data = request.json
        product = {
            'name': data['name'],
            'brand': data['brand'],
            'category': data['category'],
            'description': data['description'],
            'images': data['images'],
            'sizes': data.get('sizes', []),
            'status': data.get('status', 'available'),
            'featured': data.get('featured', False),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = products_collection.insert_one(product)
        product['_id'] = str(result.inserted_id)
        return jsonify(product), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    try:
        data = request.json
        update_data = {
            'name': data['name'],
            'brand': data['brand'],
            'category': data['category'],
            'description': data['description'],
            'images': data['images'],
            'sizes': data.get('sizes', []),
            'status': data.get('status', 'available'),
            'featured': data.get('featured', False),
            'updated_at': datetime.utcnow()
        }
        result = products_collection.update_one(
            {'_id': ObjectId(product_id)},
            {'$set': update_data}
        )
        if result.matched_count == 0:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify({'message': 'Product updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    try:
        result = products_collection.delete_one({'_id': ObjectId(product_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages', methods=['POST'])
def create_message():
    try:
        data = request.json
        message = {
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'read': False,
            'created_at': datetime.utcnow()
        }
        result = messages_collection.insert_one(message)
        message['_id'] = str(result.inserted_id)
        return jsonify(message), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages', methods=['GET'])
@admin_required
def get_messages():
    try:
        messages = list(messages_collection.find().sort('created_at', -1))
        messages = [serialize_doc(message) for message in messages]
        return jsonify(messages), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/<message_id>/read', methods=['PUT'])
@admin_required
def mark_message_read(message_id):
    try:
        result = messages_collection.update_one(
            {'_id': ObjectId(message_id)},
            {'$set': {'read': True}}
        )
        if result.matched_count == 0:
            return jsonify({'error': 'Message not found'}), 404
        return jsonify({'message': 'Message marked as read'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/<message_id>', methods=['DELETE'])
@admin_required
def delete_message(message_id):
    try:
        result = messages_collection.delete_one({'_id': ObjectId(message_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Message not found'}), 404
        return jsonify({'message': 'Message deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/settings', methods=['GET'])
def get_settings():
    try:
        settings = settings_collection.find_one({'key': 'site_settings'})
        if not settings:
            settings = {
                'key': 'site_settings',
                'hero_title': 'Premium Wholesale & Retail Footwear Collection',
                'hero_description': 'Discover our extensive range of high-quality footwear from trusted brands.',
                'hero_image': '',
                'logo_url': '',
                'contact_info': {}
            }
        return jsonify(serialize_doc(settings)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/settings', methods=['PUT'])
@admin_required
def update_settings():
    try:
        data = request.json
        result = settings_collection.update_one(
            {'key': 'site_settings'},
            {'$set': data},
            upsert=True
        )
        return jsonify({'message': 'Settings updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
