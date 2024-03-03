export interface IFindAllCreatorsFilters {
  followersRange: IFollowersRangeFilter;
  contentTags: IContentTagsFilter;
  integrated: IIntegratedFilter;
}

interface IContentTagsFilter {
  active: Boolean;
  value: string[];
}

interface IFollowersRangeFilter {
  active: Boolean;
  value: IFollowersRange;
}

interface IFollowersRange {
  minFollowers: number;
  maxFollowers: number;
}

interface IIntegratedFilter {
  active: Boolean;
  value: Boolean;
}
