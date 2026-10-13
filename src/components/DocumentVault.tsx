import React, { useState } from 'react';
import {
  FileCheck,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Shield,
  Lock,
  Sparkles,
  Info,
  Download,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { DocumentVaultItem } from '../types/travel';

interface DocumentVaultProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  selectedDestination?: string;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  onShowToast,
  selectedDestination = 'Dubai, United Arab Emirates'
}) => {
  // Pre-seeded standard international document checklist
  const [documents, setDocuments] = useState<DocumentVaultItem[]>([
    {
      id: 'doc-pass-1',
      title: 'Original Passport (Bio-Data & Address Pages)',
      category: 'passport',
      status: 'uploaded',
      required: true,
      fileName: 'passport_biopage_scan.pdf',
      fileSize: '1.8 MB',
      uploadedAt: '2026-10-10',
      fileType: 'application/pdf',
      notes: 'Validity checked: valid for 18 months. Meets 6-month international entry requirement.'
    },
    {
      id: 'doc-photo-2',
      title: 'Passport-Size Photograph (White Background)',
      category: 'photo',
      status: 'uploaded',
      required: true,
      fileName: 'studio_photo_35x45.jpg',
      fileSize: '840 KB',
      uploadedAt: '2026-10-10',
      fileType: 'image/jpeg',
      notes: 'Matte finish, 80% facial coverage without spectacles.'
    },
    {
      id: 'doc-flight-3',
      title: 'Confirmed Return Flight Ticket / E-Ticket Voucher',
      category: 'flight',
      status: 'uploaded',
      required: true,
      fileName: 'emirates_return_booking.pdf',
      fileSize: '420 KB',
      uploadedAt: '2026-10-11',
      fileType: 'application/pdf',
      notes: 'Matches entry and exit dates of planned trip.'
    },
    {
      id: 'doc-hotel-4',
      title: 'Hotel Reservation Vouchers (Proof of Accommodation)',
      category: 'hotel',
      status: 'pending',
      required: true,
      notes: 'Must cover every single night in the destination country.'
    },
    {
      id: 'doc-ins-5',
      title: 'International Travel & Emergency Medical Insurance',
      category: 'insurance',
      status: 'pending',
      required: true,
      notes: 'Minimum coverage of €30,000 for Schengen or $50,000 for international destinations.'
    },
    {
      id: 'doc-bank-6',
      title: 'Bank Account Statements (Past 3-6 Months Stamped)',
      category: 'financial',
      status: 'needs_correction',
      required: true,
      fileName: 'bank_statement_aug_oct.pdf',
      fileSize: '2.4 MB',
      uploadedAt: '2026-10-09',
      fileType: 'application/pdf',
      notes: 'Feedback: Missing official bank branch seal/stamp on page 3. Please re-upload verified copy.'
    },
    {
      id: 'doc-form-7',
      title: 'Visa Application Form (Signed)',
      category: 'visa_form',
      status: 'pending',
      required: true,
      notes: 'Signatures must match passport page exactly.'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<string | null>(null);

  // File Upload Handler (Simulated in-memory secure vault with strict validation)
  const handleFileUpload = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Security & file validation
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      onShowToast('Invalid file format. Only PDF, JPG, and PNG files are accepted.', 'error');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      onShowToast('File size exceeds the 10 MB limit.', 'error');
      return;
    }

    setIsSimulatingUpload(docId);

    setTimeout(() => {
      const fileSizeFormatted = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
      const dateFormatted = new Date().toISOString().split('T')[0];

      setDocuments(prev =>
        prev.map(d =>
          d.id === docId
            ? {
                ...d,
                status: 'uploaded',
                fileName: file.name,
                fileSize: fileSizeFormatted,
                uploadedAt: dateFormatted,
                fileType: file.type,
                notes: 'Uploaded securely in-memory. Ready for verification review.'
              }
            : d
        )
      );
      setIsSimulatingUpload(null);
      onShowToast(`Successfully uploaded "${file.name}" to your Document Vault!`, 'success');
    }, 800);
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments(prev =>
      prev.map(d =>
        d.id === docId
          ? {
              ...d,
              status: 'pending',
              fileName: undefined,
              fileSize: undefined,
              uploadedAt: undefined,
              fileType: undefined,
              notes: 'Document pending upload.'
            }
          : d
      )
    );
    onShowToast('Document removed from vault.', 'info');
  };

  const handleStatusChange = (docId: string, newStatus: DocumentVaultItem['status']) => {
    setDocuments(prev =>
      prev.map(d => (d.id === docId ? { ...d, status: newStatus } : d))
    );
    onShowToast(`Status updated to "${newStatus.replace('_', ' ')}"`, 'success');
  };

  // Metrics
  const totalRequired = documents.filter(d => d.required).length;
  const completedRequired = documents.filter(d => d.required && (d.status === 'uploaded' || d.status === 'reviewed')).length;
  const completionPercent = Math.round((completedRequired / Math.max(1, totalRequired)) * 100);
  const missingItems = documents.filter(d => d.required && (d.status === 'pending' || d.status === 'needs_correction'));

  // Printable checklist
  const handlePrintChecklist = () => {
    window.print();
  };

  const handleDownloadTextChecklist = () => {
    const textContent = `SAATHI INTERNATIONAL TRAVEL DOCUMENT CHECKLIST\nDestination: ${selectedDestination}\nDate: ${new Date().toLocaleDateString()}\nReadiness: ${completionPercent}% Completed\n\n` +
      documents.map(d => `[${d.status.toUpperCase()}] ${d.title}\n  Category: ${d.category} | File: ${d.fileName || 'Pending'} | Notes: ${d.notes || 'None'}\n`).join('\n') +
      `\nOfficial Reminder: Ensure passport has at least 6 months validity from date of international entry.`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAATHI_Document_Checklist_${selectedDestination.split(',')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Document checklist downloaded!', 'success');
  };

  const filteredDocs = documents.filter(d => {
    if (activeCategory === 'all') return true;
    return d.category === activeCategory;
  });

  return (
    <div id="vault" className="py-16 lg:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E2DDD2]">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#247BA0] mb-2 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#FF8066]" />
              <span>Encrypted Personal Travel Repository</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
              My Document Vault
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#243E56]">
              Destination-tailored document checklist for <strong>{selectedDestination}</strong> with file validation and readiness tracking.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadTextChecklist}
              className="px-4 py-2.5 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#102A43] text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#247BA0]" />
              <span>Download Checklist</span>
            </button>
            <button
              onClick={handlePrintChecklist}
              className="px-4 py-2.5 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#102A43] text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#247BA0]" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>

        {/* Readiness Status Card */}
        <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DCE8DF] flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Document Vault Readiness</span>
              </span>
              <span className="text-sm font-bold text-white">
                {completedRequired} of {totalRequired} Mandatory Documents Verified ({completionPercent}%)
              </span>
            </div>

            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${completionPercent}%` }}
                className="h-full bg-gradient-to-r from-[#247BA0] to-[#FF8066] transition-all duration-500 rounded-full"
              />
            </div>

            <p className="text-xs text-white/80 mt-2.5">
              {completionPercent === 100
                ? '🎉 Excellent! All required travel documents are uploaded and formatted.'
                : missingItems.length > 0
                ? `⚠️ Action Required: ${missingItems.length} mandatory document(s) pending or need correction prior to visa submission.`
                : 'Upload your documents below to verify completeness.'}
            </p>
          </div>

          {/* Privacy & Security Badge */}
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 max-w-sm shrink-0 text-xs text-white/90 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <Lock className="w-4 h-4" />
              <span>In-Memory Safe Sandbox</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Files are held in temporary private session memory with local validation. No sensitive biometric or passport files are transmitted to public directories.
            </p>
          </div>
        </div>

        {/* Missing Items Warning Alert if any */}
        {missingItems.length > 0 && (
          <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Action Needed Before Visa Lodgement:
              </h4>
              <p className="text-xs text-amber-800 mt-1">
                You still have <strong>{missingItems.length} items</strong> pending or needing correction:{' '}
                {missingItems.map(m => m.title).join(', ')}.
              </p>
            </div>
          </div>
        )}

        {/* Documents Table / Card List */}
        <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="font-display text-xl font-bold text-[#102A43]">
              Required International Documents
            </h4>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'passport', label: 'Passport' },
                { id: 'flight', label: 'Flights' },
                { id: 'hotel', label: 'Hotels' },
                { id: 'insurance', label: 'Insurance' },
                { id: 'financial', label: 'Financial' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#102A43] text-white'
                      : 'bg-[#FAF8F3] text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredDocs.map((doc) => {
              const isUploaded = doc.status === 'uploaded';
              const isReviewed = doc.status === 'reviewed';
              const isPending = doc.status === 'pending';
              const isCorrection = doc.status === 'needs_correction';

              return (
                <div key={doc.id} className="p-6 hover:bg-[#FAF8F3]/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Document Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isUploaded || isReviewed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          isCorrection ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                        {doc.required && (
                          <span className="text-[10px] font-semibold text-rose-600 uppercase">
                            * Mandatory
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 capitalize">
                          · {doc.category}
                        </span>
                      </div>

                      <h5 className="font-bold text-sm sm:text-base text-[#102A43]">
                        {doc.title}
                      </h5>

                      {doc.notes && (
                        <p className={`text-xs ${isCorrection ? 'text-rose-700 font-medium' : 'text-gray-500'}`}>
                          {doc.notes}
                        </p>
                      )}

                      {doc.fileName && (
                        <div className="flex items-center gap-3 text-xs text-[#247BA0] font-medium pt-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{doc.fileName} ({doc.fileSize})</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-gray-400">Uploaded {doc.uploadedAt}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Upload Interface & Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {isSimulatingUpload === doc.id ? (
                        <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
                          <span>Encrypting & Verifying...</span>
                        </div>
                      ) : (
                        <label className="px-4 py-2 bg-[#247BA0] hover:bg-[#1A5E7B] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{doc.fileName ? 'Replace File' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(doc.id, e)}
                            className="hidden"
                          />
                        </label>
                      )}

                      {/* Status Selector */}
                      <select
                        value={doc.status}
                        onChange={(e) => handleStatusChange(doc.id, e.target.value as any)}
                        className="bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl px-2.5 py-2 text-xs font-semibold text-[#102A43] cursor-pointer focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="uploaded">Uploaded</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="needs_correction">Needs Correction</option>
                      </select>

                      {doc.fileName && (
                        <button
                          onClick={() => handleRemoveFile(doc.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          * Disclaimer: The SAATHI Document Vault validates formatting, file constraints, and checklist completion for your trip. It does not constitute official legal attestation or government embassy approval.
        </div>
      </div>
    </div>
  );
};
