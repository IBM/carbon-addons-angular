import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	ViewEncapsulation
} from '@angular/core';
import { BreadcrumbItem } from 'carbon-components-angular';
import * as contrast from 'get-contrast';

/**
 * Adds an item to the end of a `BreadcrumbItem` list to serve as a title for the page header component
 *
 * @param items a list of `BreadcumbItem`s _without_ an item to serve as a title
 * @param title the title to add to the list of items
 */
export const itemsWithTitle = (items: BreadcrumbItem[], title: string): BreadcrumbItem[] =>  {
	return [
		...items,
		{
			content: title,
			href: ''
		}
	];
};

/**
 * Page header
 *
 * The page header component uses the _last_ item in the `items` array as the title.
 *
 * For conveninence we provide a `itemsWithTitle` function that will take an existing
 * set of breadcrumb items and add one to the end to act as a title.
 *
 * Example:
 *
 * component.ts
 * ```typescript
 * items = itemsWithTitle([
 * 	{
 * 		content: "one",
 * 		href: "first link"
 * 	},
 * 	{
 * 		content: "two",
 * 		href: "second link"
 * 	}
 * ], "Hello World");
 * ```
 *
 * component.html
 * ```
 * <sc-page-header [items]="currentPath"></sc-page-header>
 * ```
 */
@Component({
	selector: 'ibm-page-header',
	template: `
		<div class="ibm--page-header__container"
			[class.ibm--page-header__container--contained-width]="containedWidth">
			<div class="ibm--page-header__main">
				<ibm-breadcrumb
					class="breadcrumbs"
					[ariaLabel]="ariaLabel"
					[items]="items"
					(navigation)="navigation.emit($event)">
				</ibm-breadcrumb>
				<div class="ibm--page-header__title-container">
					<h1 class="ibm--page-header__title" [attr.title]="title">
						{{ title }} 
						<ng-content select="[title]"></ng-content>
					</h1>
					<span class="ibm--page-header__details">
						<ng-content select="[details]"></ng-content>
					</span>
				</div>
				<span class="ibm--page-header__sub-title">
					{{ subTitle }}
				</span>
			</div>
			<div class="ibm--page-header__actions">
				<ng-content select="[actions]"></ng-content>
			</div>
		</div>
	`,
	styleUrls: ['./page-header.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent {
	/**
	 * Enable dark theme for accessiblity
	 */
	darkTheme = false;

	/**
	 * Items to display in the header. The last item is used as the title
	 */
	@Input() items: BreadcrumbItem[] = [];

	/**
	 * Accessible label for the underlying `<nav></nav>` element that the breadcrumb
	 * items reside in
	 */
	@Input() ariaLabel: string;

	/**
	 * Page header title
	 */
	@Input() title: string;

	/**
	 * Page header sub-title
	 */
	@Input() subTitle: string;

	/**
	 * Page header variant with limited width
	 */
	@Input() containedWidth: boolean;

	/**
	 * Custom bg color
	 */
	@Input() bgColor: string;

	/**
	 * Emits the navigation status promise when the link is activated
	 *
	 * (event forwarded from the underlying `ibm-breadcrumb`)
	 */
	@Output() navigation = new EventEmitter<Promise<boolean>>();

	@HostBinding('style.background-color') get customBgColor(): string {
		return this.bgColor;
	}

	@HostBinding('class.has-dark-theme') get hasDarkTheme(): boolean {
		if (!this.bgColor) {
			return;
		}

		const lightText = '#f4f4f4';
		const darkText = '#161616';
		const lightRatio = contrast.ratio(this.bgColor, lightText);
		const darkRatio = contrast.ratio(this.bgColor, darkText);
		this.darkTheme = lightRatio >= darkRatio ? true : false;

		return this.darkTheme;
	}

	@HostBinding('class.has-breadcrumbs') get hasBreadcrumbs(): boolean {
		return this.items.length > 0;
	}

	@HostBinding('class.has-sub-title') get hasSubTitle(): boolean {
		return !!this.subTitle;
	}
}
