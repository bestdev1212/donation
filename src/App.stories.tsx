import { ComponentMeta, ComponentStory } from '@storybook/react';

import App from "./App";



export default {
    title: 'App component',
    component: App,
    parameters: {}

} as ComponentMeta<typeof App>
const Template: ComponentStory<typeof App> = () => <App />

export const Default = Template.bind({})
