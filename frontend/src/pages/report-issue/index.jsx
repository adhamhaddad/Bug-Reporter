import React, { useState } from 'react';
import styles from '../../styles/reportIssue.module.css';

const ReportIssue = () => {
  const [issue, setIssue] = useState({});
  const handleChange = (prop) => (event) => {
    setIssue((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.push('category', issue.category);
    formData.push('reproducibility', issue.reproducibility);
    formData.push('severity', issue.severity);
    formData.push('priority', issue.priority);
    formData.push('summary', issue.summary);
    formData.push('description', issue.description);
    formData.push('files', issue.files);
    formData.push('view_status', issue.status);
    formData.push('user_id', issue.id);

    const request = {
      headers: {
        authorization: `Bearer token`
      },
      body: JSON.stringify(formData)
    };
    // Function Send Request using axios
  };
  return (
    <div className={styles['report-issue']}>
      <form onSubmit={handleSubmit} className={styles['report-form']}>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Category</div>
          <div className={styles['form-box_inputs']}>
            <select onChange={handleChange('category')}>
              <option value='test1'>test1</option>
              <option value='test2'>test2</option>
              <option value='test3'>test3</option>
            </select>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Reproducibility</div>
          <div className={styles['form-box_inputs']}>
            <select onChange={handleChange('reproducibility')}>
              <option value='test1'>test1</option>
              <option value='test2'>test2</option>
              <option value='test3'>test3</option>
            </select>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Severity</div>
          <div className={styles['form-box_inputs']}>
            <select onChange={handleChange('severity')}>
              <option value='test1'>test1</option>
              <option value='test2'>test2</option>
              <option value='test3'>test3</option>
            </select>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Priority</div>
          <div className={styles['form-box_inputs']}>
            <select onChange={handleChange('priority')}>
              <option value='normal'>normal</option>
              <option value='high'>high</option>
              <option value='urgent'>urgent</option>
            </select>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Summary</div>
          <div className={styles['form-box_inputs']}>
            <textarea
              cols='30'
              rows='10'
              onChange={handleChange('summary')}
            ></textarea>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Description</div>
          <div className={styles['form-box_inputs']}>
            <textarea
              cols='30'
              rows='10'
              onChange={handleChange('description')}
            ></textarea>
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>Upload Files</div>
          <div className={styles['form-box_inputs']}>
            <input type='file' />
          </div>
        </div>
        <div className={styles['form-box']}>
          <div className={styles['form-box_title']}>View Status</div>
          <div className={styles['form-box_inputs']}>
            <label>
              public
              <input
                type='radio'
                name='status'
                value='public'
                onChange={handleChange('view_status')}
              />
            </label>
            <label>
              private
              <input
                type='radio'
                name='status'
                value='private'
                onChange={handleChange('view_status')}
              />
            </label>
          </div>
        </div>
        <button type='submit'>Submit Issue</button>
      </form>
    </div>
  );
};
export default ReportIssue;
