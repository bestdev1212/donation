import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from "./card";



export default {
    title: 'Card component',
    component: Card,
    parameters: {}

} as ComponentMeta<typeof Card>
const Template: ComponentStory<typeof Card> = () => <Card />

export const Default = Template.bind({})
