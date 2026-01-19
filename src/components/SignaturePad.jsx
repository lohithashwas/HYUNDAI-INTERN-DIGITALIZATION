import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onEnd }) => {
    const sigCanvas = useRef({});
    const [width, setWidth] = useState(window.innerWidth > 550 ? 500 : window.innerWidth - 60);

    // Update width on resize
    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 550 ? 500 : window.innerWidth - 60);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const clear = () => {
        sigCanvas.current.clear();
        onEnd(null);
    };

    const handleEnd = () => {
        const canvas = sigCanvas.current;
        if (!canvas) return;

        try {
            if (canvas.isEmpty()) {
                const data = canvas.toDataURL('image/png');
                onEnd(data);
            } else {
                const data = canvas.getTrimmedCanvas().toDataURL('image/png');
                onEnd(data);
            }
        } catch (e) {
            console.error("Signature capture error", e);
            if (canvas.getCanvas()) {
                onEnd(canvas.getCanvas().toDataURL('image/png'));
            }
        }
    };

    return (
        <div className="signature-container" style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', background: 'white' }}>
            <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Operator Signature</p>
            <div style={{ border: '1px solid #ddd', height: '150px', display: 'flex', justifyContent: 'center', background: '#f9f9f9' }}>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ width: width, height: 150, className: 'sigCanvas' }}
                    onEnd={handleEnd}
                />
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small style={{ color: '#999' }}>Sign above</small>
                <button type="button" onClick={clear} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                    Clear Signature
                </button>
            </div>
        </div>
    );
};

export default SignaturePad;
