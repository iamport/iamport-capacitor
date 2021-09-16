import styled from 'styled-components';

const FormContainer = styled.div`
  border-radius: 3px;
  background-color: #fff;
  &&& {
    padding: 1.5rem;
  }

  .ant-row.ant-legacy-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .ant-col.ant-legacy-form-item-label {
      flex: 3;
      label {
        color: #888;
        font-size: 0.8rem;
      }
    }
    .ant-col.ant-legacy-form-item-control-wrapper {
      flex: 7;
    }
  }

  > button {
    margin-top: 1rem;
    width: 100%;
  }
`;

export default FormContainer;