import React from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

const EmptyState: React.FC<Props> = ({
  title = 'কোনো এন্ট্রি নেই',
  subtitle = 'নতুন এন্ট্রি যোগ করতে নিচে বাটনটি ব্যবহার করুন',
  primaryLabel = 'নতুন যোগ করুন',
  onPrimary,
  secondaryLabel = 'কীভাবে ব্যবহার করবেন',
  onSecondary,
}) => {
  return (
    <div role="status" aria-live="polite" className="py-6 px-4">
      <div className="flex flex-col items-center gap-4">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-gray-200"/>
          <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h3 className="text-lg font-semibold text-center text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 text-center max-w-xs">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={onPrimary}
            className="px-4 py-2 bg-[#427baa] text-white rounded-md text-sm hover:bg-[#356a91] transition-colors"
          >
            {primaryLabel}
          </button>
          <button
            onClick={onSecondary}
            className="px-3 py-2 text-sm text-gray-700 rounded-md underline"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
