// export directly from the index file to work around some bugs with
// typescript and ngc and "barrel" files - https://github.com/ng-packagr/ng-packagr/issues/195
export { PageHeaderComponent, PageHeaderModule } from './page-header/base/index';
export * from './table/index';

// Org specific components
export {
  PageHeaderComponent as SterlingPageHeaderComponent,
  PageHeaderModule as SterlingPageHeaderModule
} from './sterling/index';
