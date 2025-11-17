// components/NotificationList.tsx
import React from 'react';

interface Notification {
  id: string;
  title: string;
  type: string;
  repository: string;
  unread: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-center justify-between p-3 bg-aura-black/30 rounded-lg border border-aura-purple/10">
          <div className="flex-1">
            <span className="text-white block">{notification.title}</span>
            <span className="text-gray-400 text-sm">Repo: {notification.repository}</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            notification.unread 
              ? 'bg-aura-azure text-white' 
              : 'bg-gray-600 text-gray-300'
          }`}>
            {notification.unread ? 'NEW' : 'READ'}
          </span>
        </div>
      ))}
    </div>
  );
}