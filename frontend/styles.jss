* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: #e2e8f0;
}

/* Background blur effect */
.background-blur {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.blur-circle-1 {
  position: absolute;
  top: 5rem;
  left: 2.5rem;
  width: 18rem;
  height: 18rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  filter: blur(3rem);
}

.blur-circle-2 {
  position: absolute;
  bottom: 5rem;
  right: 2.5rem;
  width: 18rem;
  height: 18rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 50%;
  filter: blur(3rem);
}

/* Main container */
.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 42rem;
}

/* Glassmorphism card */
.card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

@media (min-width: 768px) {
  .card {
    padding: 3rem;
  }
}

/* Header */
.header {
  margin-bottom: 2.5rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

@media (min-width: 768px) {
  .header h1 {
    font-size: 2.25rem;
  }
}

.header p {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #cbd5e1;
}

/* Upload section */
.upload-section {
  margin-bottom: 1.5rem;
}

.upload-label {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
}

.file-input {
  display: none;
}

.upload-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 1.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.02);
}

.upload-area:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.upload-area.drag-over {
  border-color: rgba(59, 130, 246, 0.8);
  background: rgba(59, 130, 246, 0.1);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.upload-icon {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 0.5rem;
  color: #93c5fd;
  transition: background 0.3s ease;
}

.upload-area:hover .upload-icon {
  background: rgba(59, 130, 246, 0.3);
}

.upload-text {
  color: #e2e8f0;
  font-weight: 500;
}

.upload-subtext {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.file-name {
  color: #86efac;
  font-weight: 500;
}

/* Error message */
.error-message {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  animation: slideIn 0.3s ease;
}

.error-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #fca5a5;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.error-text {
  color: #fecaca;
  font-size: 0.875rem;
}

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  font-size: 1rem;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #4338ca 100%);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  cursor: not-allowed;
  opacity: 0.5;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Results section */
.results-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.results-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.results-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-height: 24rem;
  overflow-y: auto;
  line-height: 1.6;
}

.results-content {
  font-size: 0.875rem;
  color: #e2e8f0;
}

.result-section-header {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.result-section-header:first-child {
  margin-top: 0;
}

.result-bullet {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.result-bullet-point {
  color: #60a5fa;
  flex-shrink: 0;
}

.result-bullet-text {
  color: #e2e8f0;
  word-break: break-word;
}

.result-numbered {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.result-number {
  color: #60a5fa;
  font-weight: 600;
  flex-shrink: 0;
}

.result-text {
  color: #e2e8f0;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.result-empty-line {
  height: 0.5rem;
}

.results-hint {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  margin-top: 0.5rem;
}

/* Scrollbar styling */
.results-container::-webkit-scrollbar {
  width: 8px;
}

.results-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.results-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.results-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Footer */
.footer {
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 2rem;
  line-height: 1.6;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hidden {
  display: none;
}
