import React, { forwardRef } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';

interface eachData {
  label: string;
  value: string | number;
}

interface SelectorProps {
  data: Array<eachData>;
  value: string | number;
  onChange?: (e: any) => void;
}

const Selector = forwardRef((props: SelectorProps, ref: any) => {
  const { data, value, onChange } = props;
  return (
    <IonSelect
      ref={ref}
      value={value}
      onIonChange={onChange}
    >
      {
        data.map((eachData: eachData) => {
          const { label, value } = eachData;
          return <IonSelectOption value={value} key={value}>{label}</IonSelectOption>;
        })
      }
    </IonSelect>
  );
});

export default Selector;