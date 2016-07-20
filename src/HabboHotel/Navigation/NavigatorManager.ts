import NavigatorPublicCategory from './NavigatorPublicCategory';

export default class NavigatorManager {
	private publicCategories: Array<NavigatorPublicCategory>;
	//private filterSettings: Array<NavigatorFilterComparator>;
	//private filters: Array<NavigatorFilter>;

	public constructor(){
		this.publicCategories = new Array<NavigatorPublicCategory>();
	}
}