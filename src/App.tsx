import React from 'react';
import { Calculator, FileUp, Settings, EuroIcon, Clock, PenTool as Tool, Repeat, Gauge, Globe2, RefreshCw, Heart } from 'lucide-react';
import parseSVG from 'svg-path-parser';

const translations = {
  en: {
    title: 'Laser/CNC Cut Price Calculator',
    subtitle: 'Calculate cutting costs based on your design files',
    uploadTitle: 'Upload Design File',
    chooseFile: 'Choose File',
    uploadHint: 'Upload .svg files',
    settings: 'Settings',
    costPerHour: 'Cost per hour',
    fixedCostPerHour: 'Fixed cost per hour',
    machinePrice: 'Machine price',
    calculationParameters: 'Calculation Parameters',
    cuttingSpeed: 'Cutting speed (mm/second)',
    numberOfPasses: 'Number of passes',
    calculationResults: 'Calculation Results',
    totalPathLength: 'Total path length',
    travelTime: 'Travel time',
    machineLaborCost: 'Machine labor cost',
    totalPrice: 'Total price',
    minutes: 'minutes',
    perHour: '/hour',
    recalculate: 'Recalculate'
  },
  pt: {
    title: 'Calculadora de Preço de Corte Laser/CNC',
    subtitle: 'Calcule custos de corte com base em seus arquivos de design',
    uploadTitle: 'Enviar Arquivo de Design',
    chooseFile: 'Escolher Arquivo',
    uploadHint: 'Envie arquivos .svg',
    settings: 'Configurações',
    costPerHour: 'Custo por hora',
    fixedCostPerHour: 'Custo fixo por hora',
    machinePrice: 'Preço da máquina',
    calculationParameters: 'Parâmetros de Cálculo',
    cuttingSpeed: 'Velocidade de corte (mm/segundo)',
    numberOfPasses: 'Número de passadas',
    calculationResults: 'Resultados do Cálculo',
    totalPathLength: 'Comprimento total do caminho',
    travelTime: 'Tempo de percurso',
    machineLaborCost: 'Custo de trabalho da máquina',
    totalPrice: 'Preço total',
    minutes: 'minutos',
    perHour: '/hora',
    recalculate: 'Recalcular'
  },
  es: {
    title: 'Calculadora de Precio de Corte Láser/CNC',
    subtitle: 'Calcule costos de corte basados en sus archivos de diseño',
    uploadTitle: 'Subir Archivo de Diseño',
    chooseFile: 'Elegir Archivo',
    uploadHint: 'Suba archivos .svg',
    settings: 'Ajustes',
    costPerHour: 'Costo por hora',
    fixedCostPerHour: 'Costo fijo por hora',
    machinePrice: 'Precio de la máquina',
    calculationParameters: 'Parámetros de Cálculo',
    cuttingSpeed: 'Velocidad de corte (mm/segundo)',
    numberOfPasses: 'Número de pasadas',
    calculationResults: 'Resultados del Cálculo',
    totalPathLength: 'Longitud total del recorrido',
    travelTime: 'Tiempo de recorrido',
    machineLaborCost: 'Costo de trabajo de la máquina',
    totalPrice: 'Precio total',
    minutes: 'minutos',
    perHour: '/hora',
    recalculate: 'Recalcular'
  },
  de: {
    title: 'Laser/CNC-Schnitt Preisrechner',
    subtitle: 'Berechnen Sie Schnittkosten basierend auf Ihren Designdateien',
    uploadTitle: 'Design-Datei hochladen',
    chooseFile: 'Datei wählen',
    uploadHint: 'Laden Sie .svg Dateien hoch',
    settings: 'Einstellungen',
    costPerHour: 'Kosten pro Stunde',
    fixedCostPerHour: 'Fixkosten pro Stunde',
    machinePrice: 'Maschinenpreis',
    calculationParameters: 'Berechnungsparameter',
    cuttingSpeed: 'Schnittgeschwindigkeit (mm/Sekunde)',
    numberOfPasses: 'Anzahl der Durchgänge',
    calculationResults: 'Berechnungsergebnisse',
    totalPathLength: 'Gesamtweglänge',
    travelTime: 'Fahrzeit',
    machineLaborCost: 'Maschinenarbeitskosten',
    totalPrice: 'Gesamtpreis',
    minutes: 'Minuten',
    perHour: '/Stunde',
    recalculate: 'Neu berechnen'
  },
  fr: {
    title: 'Calculateur de Prix de Découpe Laser/CNC',
    subtitle: 'Calculez les coûts de découpe basés sur vos fichiers de conception',
    uploadTitle: 'Télécharger le Fichier de Conception',
    chooseFile: 'Choisir un Fichier',
    uploadHint: 'Téléchargez des fichiers .svg',
    settings: 'Paramètres',
    costPerHour: 'Coût par heure',
    fixedCostPerHour: 'Coût fixe par heure',
    machinePrice: 'Prix de la machine',
    calculationParameters: 'Paramètres de Calcul',
    cuttingSpeed: 'Vitesse de découpe (mm/seconde)',
    numberOfPasses: 'Nombre de passages',
    calculationResults: 'Résultats du Calcul',
    totalPathLength: 'Longueur totale du trajet',
    travelTime: 'Temps de trajet',
    machineLaborCost: 'Coût du travail machine',
    totalPrice: 'Prix total',
    minutes: 'minutes',
    perHour: '/heure',
    recalculate: 'Recalculer'
  }
};

interface Settings {
  costPerHour: number;
  fixedCostPerHour: number;
  machinePrice: number;
  currency: '€' | '$' | '£' | '¥';
  language: 'en' | 'pt' | 'es' | 'de' | 'fr';
}

interface CalculationInputs {
  cuttingSpeed: number;
  numberOfPasses: number;
}

interface CalculationResults {
  pathLength: number;
  travelTime: number;
  machineLaborCost: number;
  totalPrice: number;
}

function App() {
  const [settings, setSettings] = React.useState<Settings>({
    costPerHour: 50,
    fixedCostPerHour: 20,
    machinePrice: 15000,
    currency: '€',
    language: 'en'
  });

  const currencies = [
    { symbol: '€', label: 'EUR' },
    { symbol: '$', label: 'USD' },
    { symbol: '£', label: 'GBP' },
    { symbol: '¥', label: 'JPY' }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' }
  ];

  const [calculationInputs, setCalculationInputs] = React.useState<CalculationInputs>({
    cuttingSpeed: 10,
    numberOfPasses: 1,
  });

  const [results, setResults] = React.useState<CalculationResults | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [svgContent, setSvgContent] = React.useState<string | null>(null);
  const [basePathLength, setBasePathLength] = React.useState<number>(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;
    const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'));
    const validExtensions = ['.svg', '.pdf', '.dxf'];

    if (!validExtensions.includes(fileExtension)) { 
      setError('Please upload a valid .svg, .pdf, or .dxf file');
      return;
    }

    setFile(uploadedFile);
    setError(null);

    if (fileExtension === '.svg') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSvgContent(content);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(content, 'image/svg+xml');
        
        // Get all path elements
        const paths = svgDoc.querySelectorAll('path');
        let totalLength = 0;
        
        paths.forEach(path => {
          const d = path.getAttribute('d');
          if (d) {
            try {
              const pathCommands = parseSVG(d);
              totalLength += calculatePathLength(pathCommands);
            } catch (err) {
              console.error('Error parsing path:', err);
            }
          }
        });
        
        setBasePathLength(totalLength);
        // Also handle lines, circles, and rectangles
        const lines = svgDoc.querySelectorAll('line');
        const circles = svgDoc.querySelectorAll('circle');
        const rects = svgDoc.querySelectorAll('rect');
        
        lines.forEach(line => {
          const x1 = parseFloat(line.getAttribute('x1') || '0');
          const y1 = parseFloat(line.getAttribute('y1') || '0');
          const x2 = parseFloat(line.getAttribute('x2') || '0');
          const y2 = parseFloat(line.getAttribute('y2') || '0');
          totalLength += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        });
        
        circles.forEach(circle => {
          const r = parseFloat(circle.getAttribute('r') || '0');
          totalLength += 2 * Math.PI * r;
        });
        
        rects.forEach(rect => {
          const width = parseFloat(rect.getAttribute('width') || '0');
          const height = parseFloat(rect.getAttribute('height') || '0');
          totalLength += 2 * (width + height);
        });
        
        calculateResults(totalLength);
      };
      reader.readAsText(uploadedFile);
    } else {
      setError(`${fileExtension.toUpperCase()} parsing not implemented yet`);
    }
  };

  const calculatePathLength = (commands: any[]): number => {
    let length = 0;
    let lastX = 0;
    let lastY = 0;
    
    commands.forEach(cmd => {
      switch (cmd.code) {
        case 'M':
        case 'L':
          length += Math.sqrt(
            Math.pow(cmd.x - lastX, 2) + Math.pow(cmd.y - lastY, 2)
          );
          lastX = cmd.x;
          lastY = cmd.y;
          break;
        case 'C':
          // Approximate cubic bezier curve length
          const points = [
            { x: lastX, y: lastY },
            { x: cmd.x1, y: cmd.y1 },
            { x: cmd.x2, y: cmd.y2 },
            { x: cmd.x, y: cmd.y }
          ];
          length += approximateBezierLength(points);
          lastX = cmd.x;
          lastY = cmd.y;
          break;
        // Add more cases for other path commands as needed
      }
    });
    
    return length;
  };

  const approximateBezierLength = (points: { x: number; y: number }[], steps = 10): number => {
    let length = 0;
    let lastPoint = points[0];
    
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const point = getBezierPoint(points, t);
      length += Math.sqrt(
        Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2)
      );
      lastPoint = point;
    }
    
    return length;
  };

  const getBezierPoint = (points: { x: number; y: number }[], t: number) => {
    const n = points.length - 1;
    let x = 0;
    let y = 0;
    
    for (let i = 0; i <= n; i++) {
      const b = bernstein(n, i, t);
      x += points[i].x * b;
      y += points[i].y * b;
    }
    
    return { x, y };
  };

  const bernstein = (n: number, i: number, t: number): number => {
    return binomialCoefficient(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
  };

  const binomialCoefficient = (n: number, k: number): number => {
    let coeff = 1;
    for (let i = n - k + 1; i <= n; i++) coeff *= i;
    for (let i = 1; i <= k; i++) coeff /= i;
    return coeff;
  };

  const calculateResults = (pathLength: number) => {
    const totalLength = basePathLength * calculationInputs.numberOfPasses;
    const speedInMMPerHour = calculationInputs.cuttingSpeed * 3600; // Convert mm/s to mm/h
    const travelTime = totalLength / speedInMMPerHour;
    const machineLaborCost = settings.machinePrice / (5 * 365 * 8); // Assuming 5 years lifespan, 365 days, 8 hours/day
    const totalPrice = (
      travelTime *
      (settings.costPerHour + settings.fixedCostPerHour + machineLaborCost)
    );

    setResults({
      pathLength: totalLength,
      travelTime,
      machineLaborCost,
      totalPrice,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              {translations[settings.language].title}
            </h1>
            <p className="mt-2 text-gray-600">{translations[settings.language].subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value as Settings['currency'] })}
                className="appearance-none bg-white border border-gray-200 rounded-md pl-3 pr-8 py-2 text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map(({ symbol, label }) => (
                  <option key={symbol} value={symbol}>
                    {symbol} {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <EuroIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="relative">
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value as Settings['language'] })}
                className="appearance-none bg-white border border-gray-200 rounded-md pl-3 pr-8 py-2 text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Globe2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </header>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">{translations[settings.language].uploadTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".svg,.pdf,.dxf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {translations[settings.language].chooseFile}
              </label>
              <p className="mt-2 text-sm text-gray-600">
                {file ? file.name : translations[settings.language].uploadHint}
              </p>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            
            {svgContent && (
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                <div 
                  className="w-full h-64 bg-gray-50 rounded flex items-center justify-center overflow-hidden"
                  dangerouslySetInnerHTML={{ 
                    __html: svgContent.replace(/<svg/, '<svg style="width: 100%; height: 100%; object-fit: contain;"')
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">{translations[settings.language].settings}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">{translations[settings.language].costPerHour} ({settings.currency})</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EuroIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={settings.costPerHour}
                  onChange={(e) =>
                    setSettings({ ...settings, costPerHour: parseFloat(e.target.value) || 0 })
                  }
                  className="pl-10 block w-full rounded-md border-gray-200 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{translations[settings.language].fixedCostPerHour} ({settings.currency})</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={settings.fixedCostPerHour}
                  onChange={(e) =>
                    setSettings({ ...settings, fixedCostPerHour: parseFloat(e.target.value) || 0 })
                  }
                  className="pl-10 block w-full rounded-md border-gray-200 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{translations[settings.language].machinePrice} ({settings.currency})</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tool className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={settings.machinePrice}
                  onChange={(e) =>
                    setSettings({ ...settings, machinePrice: parseFloat(e.target.value) || 0 })
                  }
                  className="pl-10 block w-full rounded-md border-gray-200 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Inputs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{translations[settings.language].calculationParameters}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations[settings.language].cuttingSpeed}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Gauge className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={calculationInputs.cuttingSpeed}
                  onChange={(e) =>
                    setCalculationInputs({
                      ...calculationInputs,
                      cuttingSpeed: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="pl-10 block w-full rounded-md border-gray-200 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{translations[settings.language].numberOfPasses}</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Repeat className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={calculationInputs.numberOfPasses}
                  onChange={(e) =>
                    setCalculationInputs({
                      ...calculationInputs,
                      numberOfPasses: parseInt(e.target.value) || 1
                    })
                  }
                  onBlur={() => svgContent && calculateResults(basePathLength)}
                  min="1"
                  className="pl-10 block w-full rounded-md border-gray-200 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{translations[settings.language].calculationResults}</h2>
              <button
                onClick={() => svgContent && calculateResults(basePathLength)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                {translations[settings.language].recalculate}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">{translations[settings.language].totalPathLength}</p>
                <p className="text-lg font-semibold">{results.pathLength.toFixed(2)} mm</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translations[settings.language].travelTime}</p>
                <p className="text-lg font-semibold">{(results.travelTime * 60).toFixed(2)} {translations[settings.language].minutes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translations[settings.language].machineLaborCost}</p>
                <p className="text-lg font-semibold">{settings.currency}{results.machineLaborCost.toFixed(2)}{translations[settings.language].perHour}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translations[settings.language].totalPrice}</p>
                <p className="text-2xl font-bold text-blue-600">{settings.currency}{results.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center text-gray-600">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Miguel Lobo
        </p>
      </footer>
    </div>
  );
}

export default App;