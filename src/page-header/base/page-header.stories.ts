import { boolean, color, number, text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { BreadcrumbItem, ButtonModule, TagModule } from 'carbon-components-angular';
import { itemsWithTitle } from './page-header.component';
import { PageHeaderModule } from './page-header.module';

const createBreadcrumbItems = (count: number, content = 'Breadcrumb'): BreadcrumbItem[] =>
	// fill(0) so we have something useful to map over
	Array(count).fill(0).map((x, i) => ({
		content: `${content} ${i + 1}`,
		href: '#' + (i + 1)
	}));

const createTags = (count: number) =>
	// fill(0) so we have something useful to map over
	Array(count).fill(0).map((x, i) => i + 1);

storiesOf('Base | Page header', module)
	.addDecorator(moduleMetadata({
		imports: [ PageHeaderModule, ButtonModule, TagModule ]
	}))
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		template: `
			<ibm-page-header
				[containedWidth]="containedWidth"
				[title]="title"
				[subTitle]="subTitle"
				[bgColor]="bgColor">
			</ibm-page-header>
		`,
		props: {
			containedWidth: boolean('containedWidth', false),
			title: text('title', 'Hello World'),
			subTitle: text('subTitle', ''),
			bgColor: color('bgColor', '')
		}
	}))
	.add('With Breadcrumbs', () => ({
		template: `
			<ibm-page-header
				[items]="items()"
				[containedWidth]="containedWidth"
				[title]="title"
				[subTitle]="subTitle"
				[bgColor]="bgColor">
			</ibm-page-header>
		`,
		props: {
			numberOfItems: number('numberOfItems', 3),
			containedWidth: boolean('containedWidth', false),
			title: text('title', 'Hello World'),
			subTitle: text('subTitle', 'This is a subtitle'),
			bgColor: color('bgColor', ''),
			items() {
				return createBreadcrumbItems(this.numberOfItems);
			}
		}
	}))
	.add('With Buttons', () => ({
		template: `
			<ibm-page-header
				[items]="items()"
				[containedWidth]="containedWidth"
				[title]="title"
				[subTitle]="subTitle"
				[bgColor]="bgColor">
				<ng-container actions>
					<button ibmButton="secondary" size="field">Secondary</button>
					<button ibmButton size="field">Primary</button>
				</ng-container>
			</ibm-page-header>
		`,
		props: {
			numberOfItems: number('numberOfItems', 3),
			containedWidth: boolean('containedWidth', false),
			title: text('title', 'Hello World'),
			subTitle: text('subTitle', 'This is a subtitle'),
			bgColor: color('bgColor', ''),
			items() {
				return createBreadcrumbItems(this.numberOfItems);
			}
		}
	}))
	.add('With Details', () => ({
		template: `
			<ibm-page-header
				[items]="items()"
				[containedWidth]="containedWidth"
				[title]="title"
				[subTitle]="subTitle"
				[bgColor]="bgColor">
				<ng-container details>
					<ibm-tag type="blue" *ngFor="let tag of tags(); let tagIndex = index">Tag {{tagIndex + 1}}</ibm-tag>
				</ng-container>
				<ng-container actions>
					<button ibmButton="secondary" size="field">Secondary</button>
					<button ibmButton size="field">Primary</button>
				</ng-container>
			</ibm-page-header>
		`,
		props: {
			numberOfItems: number('numberOfItems', 3),
			containedWidth: boolean('containedWidth', false),
			title: text('title', 'Hello World'),
			subTitle: text('subTitle', 'This is a subtitle'),
			numberOfTags: number('numberOfTags', 1),
			bgColor: color('bgColor', ''),
			items() {
				return createBreadcrumbItems(this.numberOfItems);
			},
			tags() {
				return createTags(this.numberOfTags);
			}
		}
	}));
