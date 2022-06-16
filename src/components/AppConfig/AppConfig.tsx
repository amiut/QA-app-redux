import Icon from '@components/Common/Icon';
import useToggle from '@hooks/useToggle';
import { useQuestions } from 'state/questions/hooks/useQuestions';

const AppConfig = () => {
  const [showConfig, toggleShowConfig] = useToggle(true);
  const { config } = useQuestions();

  return (
    <>
      <button type="button" onClick={toggleShowConfig} className="fixed top-4 left-4">
        <Icon name="gear" className="w-6 h-6" />
      </button>
      {showConfig && (
        <div className="flex mb-10 justify-center">
          <div
            className="select-none cursor-pointer mr-5 last:mr-0"
            onClick={() => {
              config.set('enterKeyIsSend', !config.enterKeyIsSend);
            }}
          >
            Enter key is send: <strong>{config.enterKeyIsSend ? 'yes' : 'no'}</strong>
          </div>

          <div
            className="select-none cursor-pointer mr-5 last:mr-0"
            onClick={() => {
              config.set('sendAfter5s', !config.sendAfter5s);
            }}
          >
            Simulate promises(5s): <strong>{config.sendAfter5s ? 'yes' : 'no'}</strong>
          </div>
        </div>
      )}
    </>
  );
};

export default AppConfig;
