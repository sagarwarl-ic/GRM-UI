import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { memberSearchList, memberProfiler, searchMemberRequest } from 'src/app/gm/gm.model';
import { segmentMetaDataList } from 'src/app/gm/segmentationbuilder/segmentationbuilder.model';
import { first, map } from 'rxjs/operators';
@Injectable()
export class GmService {
  segmentsChanged = new Subject<segmentMetaDataList[]>();
  private segments: segmentMetaDataList[] = [{
    "count": 5,
    "created": "09/08/2018",
    "segmentId": 1,
    "segmentName": "DJJSegment",
    "successFlag": true,
    "updated": "09/18/2018"
  }, {
    "count": 7,
    "created": "09/17/2018",
    "segmentId": 2,
    "segmentName": "TestSegment",
    "successFlag": true,
    "updated": "09/20/2018"
  }, {
    "count": 11,
    "created": "09/20/2018",
    "segmentId": 3,
    "segmentName": "test1234",
    "successFlag": true,
    "updated": "09/23/2018"
  }];
  memberId = 27999637881;
  private memberProfiler: memberProfiler;
  private memberSearchList: memberSearchList[];
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoadFailed = new Subject<boolean>();
  MemberSearchChanged = new Subject<memberSearchList[]>();
  memberProfilerChanged = new Subject<memberProfiler[]>();
  memberSearchUrl = '/GRM/member/search';
  memberInfoUrl = 'GRM/member/memberInfo/id/' + this.memberId;
  CampaignDetailsUrl = 'GRM/member/memberId/' + this.memberId + '/campaignSummary';
  DemographicUrl = 'GRM/member/memberId/'+ this.memberId + '/demographic';
  PromotionUrl = 'GRM/member/memberId/'+ this.memberId + '/promotion';
  constructor(private httpClient: HttpClient) {
  }

  getMemberProfilerList() {
    return this.memberSearchList.slice();
  }

  setSegmentList(segmentMetaDataList: segmentMetaDataList[]) {
    this.segments = segmentMetaDataList;
    this.segmentsChanged.next(this.segments.slice());
  }

  getSegmentList() {
    return this.segments.slice();
  }

  setMemberProfilerList(memberSearchList: memberSearchList[]) {
    this.memberSearchList = memberSearchList;
    this.MemberSearchChanged.next(this.memberSearchList.slice());
  }

  //MemberServices 

  onFetchMember(data: searchMemberRequest) {
    return this.httpClient
      .post(this.memberSearchUrl,data,)
      .pipe(map(Results => Results));
  
   }

  onFetchMemberInfo(memberId) {
    return this.httpClient
      .get(this.memberInfoUrl, memberId, )
      .pipe(map(Results => Results));

  }

  OnFetchCampaignDetails(memberId) {
    return this.httpClient
      .get(this.CampaignDetailsUrl,memberId,)
      .pipe(map(Results => Results));
  
   }

   onFetchDemographicInformation(memberId) {
    return this.httpClient
      .get(this.DemographicUrl,memberId,)
      .pipe(map(Results => Results));
  
   }

   onFetchPromotionActivityData(memberId) {
    return this.httpClient
      .get(this.PromotionUrl,memberId,)
      .pipe(map(Results => Results));
  
   }

   //SegmentServices 


}
