import { ComponentMeta, ComponentStory } from '@storybook/react';

import Alert from "./alert";



export default {
    title: 'Alert component',
    component: Alert,
    parameters: {}

} as ComponentMeta<typeof Alert>
const Template: ComponentStory<typeof Alert> = (args) => <Alert  {...args} />

export const Success_Alert = Template.bind({})

Success_Alert.args = {
    success: true,
    amount: 0.1,
    showing: true,
}

export const Fail_Alert = Template.bind({})

Fail_Alert.args = {
    success: false,
    amount: 0.1,
    showing: true,
}
