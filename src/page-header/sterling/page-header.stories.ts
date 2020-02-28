import { number, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { BreadcrumbItem } from 'carbon-components-angular';
import { itemsWithTitle } from './page-header.component';
import { PageHeaderModule } from './page-header.module';

const createBreadcrumbItems = (count: number, content = 'Breadcrumb'): BreadcrumbItem[] =>
	// fill(0) so we have something useful to map over
	Array(count).fill(0).map((x, i) => ({
		content: `${content} ${i + 1}`,
		href: '#' + (i + 1)
	}));

storiesOf('Sterling | Page header', module)
	.addDecorator(moduleMetadata({
		imports: [ PageHeaderModule ]
	}))
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		template: `
			<sc-page-header [items]="items()"></sc-page-header>
		`,
		props: {
			numberOfItems: number('numberOfItems', 3),
			items() {
				return itemsWithTitle(createBreadcrumbItems(this.numberOfItems), 'Hello world');
			}
		}
	}));
