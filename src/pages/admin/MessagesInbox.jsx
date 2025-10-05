import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchMessages = async () => {
    try {
      const auth = localStorage.getItem('admin_auth');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    const auth = localStorage.getItem('admin_auth');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const auth = localStorage.getItem('admin_auth');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (response.ok) {
        alert('Message deleted successfully!');
        setSelectedMessage(null);
        fetchMessages();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message._id);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Messages Inbox</h2>
            <p className="text-gray-600">View and manage customer inquiries</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Messages ({messages.length})</option>
              <option value="unread">Unread ({unreadCount})</option>
              <option value="read">Read ({messages.length - unreadCount})</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center">
                    <i className="ri-mail-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-600">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message._id}
                      onClick={() => handleViewMessage(message)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?._id === message._id ? 'bg-blue-50' : ''
                      } ${!message.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-medium ${!message.read ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                          {message.name}
                        </h3>
                        {!message.read && (
                          <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{message.email}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{message.message}</p>
                      <p className="text-xs text-gray-400">{formatDate(message.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {selectedMessage.name}
                        </h3>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-primary hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          selectedMessage.read ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {selectedMessage.read ? 'Read' : 'Unread'}
                        </span>
                        <button
                          onClick={() => handleDelete(selectedMessage._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <i className="ri-delete-bin-line text-xl"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Received: {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Message:</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions:</h4>
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: Your Inquiry`}
                        className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors text-center font-medium"
                      >
                        <i className="ri-mail-send-line mr-2"></i>
                        Reply via Email
                      </a>
                      <a
                        href={`tel:${selectedMessage.email}`}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        <i className="ri-phone-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <i className="ri-mail-open-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-600 text-lg">Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg mb-2">No messages yet</p>
            <p className="text-gray-500 text-sm">Customer inquiries will appear here</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MessagesInbox;
