import React from 'react';
import { useStateValue } from '../state';
import { options } from '../select-options'

const Question = ({ name, title, type, value, selectOptions }) => {
  const [{ form }, dispatch] = useStateValue();
  const props = {};
  if (type === 'radio') {
    props.value = value;
  } else {
    props.value = form[name];
  }

  return (
    <li>
      <p>{title}</p>
      { type === 'select'
      ? <select name={name} onChange={(event) => {
        const input = event.target;
        dispatch({
          form: {
            ...form,
            [input.name]: input.value,
          },
        });
      }}>
        {options[selectOptions].map(name => {
          return <option value={name} >{name}</option>
        })}
      </select>
      : <input
            {...props}
            type={type}
            name={name}
            checked={type === 'checkbox' ? form[name] : value === form[name]}
            onChange={(event) => {
              const input = event.target;
              dispatch({
                form: {
                  ...form,
                  [input.name]: type === 'checkbox' ? !!input.checked : input.value,
                },
              });
            }}
            className="inputText"
          />}

    </li>
  );
};

export const GroupQuestion = ({ title, questions }) => (
  <div className="Card">
    <div className="CardTitle">{title}</div>
    <ul className="CardBody">
      {questions.map((question, index) => (
        <Question key={`${question.name}-${index}`} {...question} />
      ))}
    </ul>
  </div>
);

export const Questions = () => {
  const [{ appMode }] = useStateValue();
  return (
    <div className="columns is-multiline">
      {appMode.groups.map((question, index) => (
        <div key={`${question.name}-${index}`} className="column is-half">
          <GroupQuestion {...question} />
        </div>
      ))}
    </div>
  );
};
