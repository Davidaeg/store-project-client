import Quagga from '@ericblade/quagga2';
import { useEffect } from 'react';

interface ScannerProps {
  onDetected: (result: any) => void;
}

export const Scanner = ({ onDetected }: ScannerProps) => {
  useEffect(() => {
    Quagga.init(
      {
        frequency: 1,
        inputStream: {
          type: 'LiveStream',
          willReadFrequently: false,
          constraints: {
            width: 350,
            height: 300,
            facingMode: 'environment',
            noiseSuppression: true
          },
          target: document.querySelector('#scanner')!
        },
        locator: {
          halfSample: true,
          patchSize: 'large' // x-small, small, medium, large, x-large
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        },
        locate: true
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, []);

  return <div style={{ maxWidth: '100%' }} id="scanner" />;
};

export default Scanner;
