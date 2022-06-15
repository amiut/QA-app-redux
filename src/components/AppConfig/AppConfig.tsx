import { useQuestions } from 'state/questions/hooks/useQuestions';

const AppConfig = () => {
  const { config } = useQuestions();

  return (
    <div className="flex mb-10">
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
  );
};

export default AppConfig;
