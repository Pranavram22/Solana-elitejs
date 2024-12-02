import React, { useEffect, useState } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { useSolanaDocument } from '../../hooks/useSolanaDocument';
import { SOL_EXPLORER_URL } from '../../config/solana';

interface Props {
  documentId: string;
  documentHash: string;
}

const DocumentVerification: React.FC<Props> = ({ documentId, documentHash }) => {
  const { verifyDocument, getDocumentVerifications, isWalletConnected } = useSolanaDocument();
  const [verifications, setVerifications] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isWalletConnected) {
      loadVerifications();
    }
  }, [documentHash, isWalletConnected]);

  const loadVerifications = async () => {
    const results = await getDocumentVerifications(documentHash);
    setVerifications(results);
  };

  const handleVerify = async () => {
    if (!isWalletConnected) return;

    try {
      setIsVerifying(true);
      const signature = await verifyDocument(documentHash);
      await loadVerifications();
      
      // Open explorer in new tab
      window.open(`${SOL_EXPLORER_URL}/tx/${signature}`, '_blank');
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Blockchain Verification</h3>
        </div>
        {isWalletConnected && (
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isVerifying ? 'Verifying...' : 'Verify on Chain'}
          </button>
        )}
      </div>

      {verifications.length > 0 ? (
        <div className="space-y-2">
          {verifications.map((v, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Verified on {v.timestamp.toLocaleDateString()}
              </span>
              <a
                href={`${SOL_EXPLORER_URL}/tx/${v.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No blockchain verifications yet. Connect your wallet to verify this document.
        </p>
      )}
    </div>
  );
};

export default DocumentVerification;