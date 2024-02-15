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
            width: 640,
            height: 320,
            facingMode: 'environment'
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

    return () => Quagga.offDetected(onDetected);
  }, []);

  return <div id="scanner" />;
};

export default Scanner;
