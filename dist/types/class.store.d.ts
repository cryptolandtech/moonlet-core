export default class DynamicClass {
    classStore: any;
    /**
     * Collects and index classes so we can instantiate them later
     * @param object
     */
    collectClasses(object: any): void;
    /**
     * Gets a class instance for supplied name and options
     * @param className
     * @param [opts]
     * @returns supplied class instance
     */
    getInstance(className: string, opts?: any): any;
}
