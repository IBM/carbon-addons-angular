import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'carbon-components-angular';

import { SterlingPageHeaderComponent } from './page-header.component';

@NgModule({
	declarations: [
		SterlingPageHeaderComponent
	],
	imports: [
		BreadcrumbModule
	],
	exports: [
		SterlingPageHeaderComponent
	]
})
export class SterlingPageHeaderModule {}
