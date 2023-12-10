import { useState } from 'react';

interface IFormProps {
  handleSaveTask: (text: string) => void;
}

export const Form: React.FC<IFormProps> = (props) => {
  const [text, setText] = useState<string>('');

  return (
    <>
      <div id="form" className="block">
        <input
          type="text"
          placeholder="Currently typing..."
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          onKeyDown={evt => {
            
            if (evt.key === 'Enter') {
              setText('');
              props.handleSaveTask(text);
            }
          }}
        />
        {text.length !== 0 && (
          <div style={{ display: 'flex', marginLeft: '1em' }}>
            <button onClick={() => {
              setText('');
              props.handleSaveTask(text);
            }}>Save</button>
          </div>
        )}
      </div>
    </>
  )
}