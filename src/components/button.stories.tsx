import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from "./button";



export default {
    title: 'Button component',
    component: Button,
    parameters: {}

} as ComponentMeta<typeof Button>
const Template: ComponentStory<typeof Button> = (args) => <Button  {...args} />

export const Default = Template.bind({})

Default.args = {
    loading: false,
    title: 'Donate',
}

export const Loading = Template.bind({})

Loading.args = {
    loading: true,
    title: 'Donate',
}
