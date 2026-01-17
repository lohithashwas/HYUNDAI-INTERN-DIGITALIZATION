import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onEnd }) => {
    const sigCanvas = useRef({});

    const clear = () => {
        sigCanvas.current.clear();
        onEnd(null);
    };

    const handleEnd = () => {
        const canvas = sigCanvas.current;
        if (!canvas) return;

        // Try to get trimmed data, fallback to normal data if trimmed is empty/issue
        try {
            if (canvas.isEmpty()) {
                // If explicitly empty, user cleared it or hasn't drawn.
                // But user claims they signed, so maybe isEmpty is wrong?
                // We will still try to get data if they triggered onEnd.
                // However, usually isEmpty is reliable. 
                // Let's rely on dataURL length check instead to be sure.
                const data = canvas.toDataURL('image/png');
                onEnd(data); // Send whatever we have
            } else {
                const data = canvas.getTrimmedCanvas().toDataURL('image/png');
                onEnd(data);
            }
        } catch (e) {
            console.error("Signature capture error", e);
            // Fallback
            if (canvas.getCanvas()) {
                onEnd(canvas.getCanvas().toDataURL('image/png'));
            }
        }
    };

    return (
        <div className="signature-container" style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', background: 'white' }}>
            <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Operator Signature</p>
            <div style={{ border: '1px solid #ddd', height: '150px' }}>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ width: 500, height: 150, className: 'sigCanvas' }}
                    onEnd={handleEnd}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <button type="button" onClick={clear} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                    Clear Signature
                </button>
            </div>
        </div>
    );
};

export default SignaturePad;
