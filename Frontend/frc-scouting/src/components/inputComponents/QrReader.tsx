import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styles from "./QrReader.module.css"; // Optional: Add your styles here

const QrReader = () => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const [scannedResult, setScannedResult] = useState<string>("");

  useEffect(() => {
    if (videoEl.current) {
      console.log("Video element is ready:", videoEl);
      const scanner = new QrScanner(videoEl.current, (result: string) => {
        setScannedResult(result);
      });

      // Start the scanner
      scanner.start().catch((error) => {
        console.error("Error starting scanner:", error);
      });

      return () => {
        scanner.stop(); // Stop the scanner on component unmount
      };
    } else {
      console.error("Video element is null");
    }
  }, []);

  return (
    <div className={styles.qrReader}>
      <video ref={videoEl} style={{ width: "100%" }} />
      {scannedResult && <p>Scanned Result: {scannedResult}</p>}
    </div>
  );
};

export default QrReader;