import React, { Component, PropTypes } from "react";
import {
	Input,
	Form,
	Button,
	Upload,
	Icon,
	message,
	DatePicker,
	Switch
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { connect } from "dva";

import config from "../../utils/config";

const FormItem = Form.Item;
class TableView extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	static defaultProps = {
		template: "",
		cont: "",
		template_name: "",
		status: 1,
		time: ""
	};

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			this.props.onSubmit(values);
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/tableManager" }));
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};

		return (
			<div className="content-inner">
				<div
					style={{
						borderBottom: "1px solid #ddd",
						marginBottom: 20,
						paddingBottom: 10
					}}
				>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>
						返回
					</Button>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>
						确认
					</Button>
				</div>

				<Form>
					<FormItem {...formItemLayout} label="姓名">
						{getFieldDecorator("userName", {
							initialValue: this.props.userName,
							rules: [
								{
									required: true,
									message: "请输入 姓名"
								}
							]
						})(<Input placeholder="请输入 姓名" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="性别">
						{getFieldDecorator("userSex", {
							initialValue: this.props.userSex,
							rules: [
								{
									required: true,
									message: "请输入 性别"
								}
							]
						})(<Input placeholder="请输入 性别" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="电话">
						{getFieldDecorator("userPhone", {
							initialValue: this.props.userPhone,
							rules: [
								{
									required: true,
									message: "请输入 电话"
								}
							]
						})(<Input placeholder="请输入 电话" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="所在地点">
						{getFieldDecorator("userLocal", {
							initialValue: this.props.userLocal,
							rules: [
								{
									required: true,
									message: "请输入 所在地点"
								}
							]
						})(<Input placeholder="请输入 所在地点" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="体温">
						{getFieldDecorator("temperature", {
							initialValue: this.props.temperature,
							rules: [
								{
									required: true,
									message: "请输入 体温"
								}
							]
						})(<Input placeholder="请输入 体温" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="时间">
						{getFieldDecorator("insertTime", {
							initialValue: this.props.insertTime,
							rules: [
								{
									required: true,
									message: "请输入 时间"
								}
							]
						})(<Input placeholder="请输入 时间" />)}
					</FormItem>
				</Form>
			</div>
		);
	}
}

export default connect(({ userFill }) => {
	return {};
})(Form.create()(TableView));
