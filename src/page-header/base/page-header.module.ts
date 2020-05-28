import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'carbon-components-angular';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
	declarations: [
		PageHeaderComponent
	],
	imports: [
		BreadcrumbModule
	],
	exports: [
		PageHeaderComponent
	]
})
export class PageHeaderModule {}
