import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'carbon-components-angular';

import { PageHeaderComponent } from './page-header.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		PageHeaderComponent
	],
	imports: [
		BreadcrumbModule,
		CommonModule
	],
	exports: [
		PageHeaderComponent
	]
})
export class PageHeaderModule {}
