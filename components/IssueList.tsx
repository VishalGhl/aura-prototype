// components/IssueList.tsx
import React from 'react';

interface Issue {
  id: string;
  title: string;
  priority: string;
  status: string;
}

interface IssueListProps {
  issues: Issue[];
}

export default function IssueList({ issues }: IssueListProps) {
  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <div key={issue.id} className="flex items-center justify-between p-3 bg-aura-black/30 rounded-lg border border-aura-azure/10">
          <div className="flex-1">
            <span className="text-white block">{issue.title}</span>
            <span className="text-gray-400 text-sm">Status: {issue.status}</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            issue.priority === 'HIGH' 
              ? 'bg-red-500 text-white' 
              : 'bg-aura-amber text-aura-black'
          }`}>
            {issue.priority}
          </span>
        </div>
      ))}
    </div>
  );
}