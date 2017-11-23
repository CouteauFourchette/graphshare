import React from 'react';
import Dropzone from 'react-dropzone';
import fileReader from '../../../utils/data/file_import_util';
import { formatData } from '../../../utils/data/data_analyzer_util';

const ACCEPTED_TYPES = ['text/csv', 'text/tab-separated-values', 'application/json'];

class DataImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'new',
      title: '',
      file_name: '',
      error: '',
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.processData = this.processData.bind(this);
    this.saveDataset = this.saveDataset.bind(this);
  }

  componentDidMount() {
    this.props.receiveDataset(this.props.dataset);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let error = '';
    const files = acceptedFiles.concat(rejectedFiles);
    if ((files.length) === 1) {
      console.log(files[0].type);
      if (ACCEPTED_TYPES.includes(files[0].type)) {
        this.setState({
          file_name: files[0].name,
        });
        error = '';
        fileReader(window.URL.createObjectURL(files[0]), files[0].type, this.processData);
      } else {
        error = `${files[0].name} is not a valid file`;
      }
    } else {
      error = 'You can only upload one file at a time';
    }
    this.setState({
      error,
    });
  }

  processData(data) {
    const dataWithType = formatData(data);
    dataWithType.id = 'new';
    dataWithType.file_name = this.state.file_name;
    dataWithType.title = this.state.title;
    this.props.receiveDataset(dataWithType);
  }

  handleTitle(event) {
    this.props.updateDatasetTitle(this.state.id, event.target.value);
    this.setState({
      title: event.target.value,
    });
  }

  saveDataset(event) {
    this.props.saveDataset(this.state.id).then(() => this.props.history.push('/datasets'));
  }

  render() {
    return (
      <div className="data-import">
        
        <label htmlFor="drop-zone"> File Upload:
          <Dropzone
            className="drop-zone"
            onDrop={this.onDrop}
            accept={ACCEPTED_TYPES.join(' ')}
          >
            {<i className="fa fa-upload fa-3x" aria-hidden="true" />}
          </Dropzone>
        </label>
        <div className="data-right">
        <label htmlFor="data-name" className="data-title-label"> Dataset Title:
          <input 
            type="text"
            id="data-name"
            value={this.state.title}
            onChange={this.handleTitle}
            placeholder="Title"
          />
        </label>
          { this.state.file_name ?
            <div>
            <label> Current File: </label>
              <span className="data-import-message">  {this.state.file_name}</span> </div> : ''
          }
          { this.state.error ?
            <div>
              <label> Error: </label>
              <span className="data-import-message error"> {this.state.error} </span>
            </div> : ''
          }
          <button className="data-save" onClick={this.saveDataset}>Save</button>
        </div>
      </div>
    );
  }
}

export default DataImport;
