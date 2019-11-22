import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { IMP, PaymentData, PaymentOptions, Response, Pg, PayMethod } from 'iamport-capacitor';

import Header from '../components/Header';
import FormContainer from '../components/FormContainer';
import Selector from '../components/Selector';

import { PGS } from '../constants';

import { getUserCode, getQuotas, getMethods } from '../utils';

const  { Item } = Form;

const initialPg: Pg = 'html5_inicis';
const initialMethod: PayMethod = 'card';
const initialQuota = 0;

const Payment: React.FC = ({ history, form }: any) => {
	const initialMerchantUid = `mid_${new Date().getTime()}`;
	const { getFieldDecorator, validateFieldsAndScroll } = form;

	const [pg, setPg] = useState<Pg>(initialPg);
	const [quota, setQuota] = useState(initialQuota);
	const [pay_method, setPayMethod] = useState<PayMethod>(initialMethod);

	function callback(response: Response) {
		const newResponse = {
			...response,
			type: 'payment',
		};

		history.push('/result', { response: newResponse });
	}
	
	function handleSubmit(e: any) {
		e.preventDefault();

		validateFieldsAndScroll((error: any, values: any) => {
			if (!error) {
				const {
					merchant_uid,
					name,
					amount,
					buyer_name,
					buyer_tel,
					buyer_email,
					escrow,
					vbank_due,
					biz_num,
					digital,
				} = values;

				const imp = new IMP();
				const userCode = getUserCode(pg);
				const data: PaymentData = {
					pg,
					pay_method,
					merchant_uid,
					name,
					amount,
					buyer_name,
					buyer_tel,
					buyer_email,
					escrow,
					app_scheme: 'io.ionic.starter',
				};
				// 신용카드의 경우, 할부기한 추가
				if (pay_method === 'card' && quota !== 0) {
					data.display = {
						card_quota: quota === 1 ? [] : [quota],
					};
				}

				// 가상계좌의 경우, 입금기한 추가
				if (pay_method === 'vbank' && vbank_due.length !== 0) {
					data.vbank_due = vbank_due;
				}

				// 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
				if (pay_method === 'vbank' && pg === 'danal_tpay') {
					data.biz_num = biz_num;
				}

				// 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
				if (pay_method === 'phone') {
					data.digital = digital;
				}

				// 정기결제의 경우, customer_uid 추가
				if (pg === 'kcp_billing') {
					data.customer_uid = `cuid_${new Date().getTime()}`;
				}

				const options: PaymentOptions = {
					userCode,
					data,
					callback,
				};
				imp.payment(options);
			}
		});
	}
	
	return (
		<IonPage>
			<Header title="결제 테스트" />
			<IonContent className="ion-padding">
				<FormContainer onSubmit={handleSubmit}>
					<Item label="PG사">
						<Selector
							data={PGS}
							value={pg}
							initialValue={initialPg}
							onChange={(value: Pg) => {
								setPg(value);

								const methods = getMethods(value);
								setPayMethod(methods[0].value);

								const quotas = getQuotas(value);
								setQuota(quotas[0].value);
							}}
						/>
					</Item>
					<Item label="결제수단">
						<Selector
							data={getMethods(pg)}
							value={pay_method}
							initialValue={initialMethod}
							onChange={(value: PayMethod) => setPayMethod(value)}
						/>
					</Item>
					{pay_method === 'card' && (
						<Item label="할부개월수">
							<Selector
								data={getQuotas(pg)}
								value={quota}
								initialValue={initialQuota}
								onChange={(value: number) => setQuota(value)}
							/>
						</Item>
					)}
					{pay_method === 'vbank' && (
						<Item label="입금기한">
							{getFieldDecorator('vbank_due')(<Input size="large" type="number" />)}
						</Item>  
					)}
					{pay_method === 'vbank' && pg === 'danal_tpay' && (
						<Item label="사업자번호">
							{getFieldDecorator('biz_num')(<Input size="large" type="number" />)}
						</Item>  
					)}
					{pay_method === 'phone' && (
						<Item label="실물 컨텐츠">
							{getFieldDecorator('digital', { valuePropName: 'checked' })(<Switch />)}
						</Item>
					)}
					<Item label="에스크로">
						{getFieldDecorator('escrow', { valuePropName: 'checked' })(<Switch />)}
					</Item>
					<Item label="주문명">
						{getFieldDecorator('name', {
							initialValue: '아임포트 결제데이터 분석',
							rules: [
								{
									required: true,
									message: '주문명은 필수입력입니다.',
								},
							],
						})(<Input size="large" />)}
					</Item>
					<Item label="결제금액">
						{getFieldDecorator('amount', {
							initialValue: '1000',
							rules: [
								{
									required: true,
									message: '결제금액은 필수입력입니다.',
								},
							],
						})(<Input size="large" type="number" />)}
					</Item>
					<Item label="주문번호">
						{getFieldDecorator('merchant_uid', {
							rules: [
								{
									required: true,
									message: '주문번호는 필수입력입니다.',
								},
							],
							initialValue: initialMerchantUid,
						})(<Input size="large" />)}
					</Item>
					<Item label="이름">
						{getFieldDecorator('buyer_name', {
							initialValue: '홍길동',
						})(<Input size="large" />)}
					</Item>
					<Item label="전화번호">
						{getFieldDecorator('buyer_phone', {
							initialValue: '01012341234',
						})(<Input size="large" type="number" />)}
					</Item>
					<Item label="이메일">
						{getFieldDecorator('buyer_email', {
							initialValue: 'example@example.com',
						})(<Input size="large" />)}
					</Item>
					<Button type="primary" size="large" htmlType="submit">결제하기</Button>
				</FormContainer>
			</IonContent>
		</IonPage>
	);
};

export default Form.create()(Payment);
  