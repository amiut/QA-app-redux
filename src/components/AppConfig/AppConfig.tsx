import { useQuestions } from 'state/questions/hooks/useQuestions';

const AppConfig = () => {
  const { config } = useQuestions();

  return (
    <div className="flex">
      <div
        className="select-none cursor-pointer"
        onClick={() => {
          config.set('enterKeyIsSend', !config.enterKeyIsSend);
        }}
      >
        Enter key is send: <strong>{config.enterKeyIsSend ? 'yes' : 'no'}</strong>
      </div>
    </div>
  );
};

export default AppConfig;
