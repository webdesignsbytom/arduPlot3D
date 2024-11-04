// Api
import client from '../../api/client';
// Constants
import { CREATE_NEW_SIMULATION_API } from '../Constants';

export const translateToPlotterLanguage = (simulationData) => {
  let commands = '';
  let lastPosition = { x: null, y: null };

  const formatPoint = (point) => {
    if (!point || !point.dataType) return '// Invalid point data\n';
    let command = '';
    if (point.xPos !== lastPosition.x || point.yPos !== lastPosition.y) {
      command += `PA ${point.xPos || 0},${point.yPos || 0}; `;
      lastPosition = { x: point.xPos, y: point.yPos };
    }
    switch (point.dataType.toLowerCase()) {
      case 'tap':
        command += `PD; PU;\n`;
        break;
      case 'move':
        command += `PU;\n`;
        break;
      case 'move_tap':
        command += `PD; PU;\n`;
        break;
      case 'drag':
        if (
          point.startxPos !== lastPosition.x ||
          point.startyPos !== lastPosition.y
        ) {
          command += `PA ${point.startxPos || 0},${point.startyPos || 0}; `;
          lastPosition = { x: point.startxPos, y: point.startyPos };
        }
        command += `PD; PA ${point.finishxPos || 0},${
          point.finishyPos || 0
        }; PU;\n`;
        lastPosition = { x: point.finishxPos, y: point.finishyPos };
        break;
      case 'timeout':
        command += `WAIT ${point.timeoutLength || 0};\n`;
        break;
      default:
        command += `// Unknown dataType: ${point.dataType}\n`;
    }
    return command;
  };
  simulationData.mainSimulationDataPoints.forEach((point) => {
    commands += formatPoint(point);
  });
  return commands;
};


export const downloadFileToMachine = (simulationData) => {
  const plotterCommands = translateToPlotterLanguage(simulationData);
  const blob = new Blob([plotterCommands], { type: 'text/plain' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${simulationData.simulationTitle}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};


export const saveAsNewFile = async (
  userId,
  simulationData,
  setIsSavingFile,
  setSaveAsModalOpen
) => {
  setIsSavingFile(true);

  client
    .post(`${CREATE_NEW_SIMULATION_API}/${userId}`, simulationData)
    .then((res) => {
      console.log('res', res);
      setIsSavingFile(false);
    })

    .catch((err) => {
      console.error('Unable to save data', err);
      setIsSavingFile(false);
    });

  setSaveAsModalOpen(false);
};
