import { moduleMetadata, storiesOf } from '@storybook/angular';

storiesOf('Welcome', module)
.addDecorator(moduleMetadata({}))
.add('to addons', () => ({
	template: '<h1>Welcome!</h1>'
}));
