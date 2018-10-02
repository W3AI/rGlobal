import { Component, OnInit } from '@angular/core';

import * as dna from "../../logic/DNA";
import * as h from "../../logic/helper";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  defaultProject = `Share Innovation Sauce
  tags : content
  INPUT	3 Terms : CAD , cent : 10 , secs : 60
  Jar , name : Jar3L , vol : 3 , content : 0 , available : 3
  Jar , name : Jar5L , vol : 5 , content : 0 , available : 5
  Jar , name : Jar8L , vol : 8 , content : 8 , available : 0
                                  
  SOLUTIONS 1
  
  OUTPUT 1
  Jar	WITH content = 4`;

  defaultOperation = `Top Innovation Sauce
tags : content
INPUT 2 Terms : CAD , cent : 1 , secs : 2
Jar	1	name : fromJar , content > 0				
Jar	2	name : toJar ,	available > 0				
                          
FUNCTIONS 1
top = MIN ( fromJar . content , toJar . available )
                          
OUTPUT 2
fromJar . content -= top , available += top				
toJar . content += top , available -= top`;

  // Problem Class structures:
  prRows: string[] = [];
  prTitle: string = '';
  prTags: string = '';
  prTerms: {currency: string, bid: number, timeframe: number};
  prCtxtRows: string[] = [];        // contextRows
  prCtxtEntitiesNo: number = 3; // 3 for testing eval, etc
  prSolRows: string[] = [];         // solutionRows
  prTestRows: string[] = [];
  prFormatted: string = '';     

  oddNumbers: number[] = [];

  // Operation Class structures:
  opRows: string[] = [];
  opTitle: string = '';
  opTags: string = '';
  opInputFunction: string = '';
  opTerms: {currency: string, bid: number, timeframe: number};
  opInputRows: string[] = [];
  opFunctionRows: string[] = []; 
  opOutputRows: string[] = [];
  opFormatted: string = '';

  evenNumbers: number[] = [];

  solution: any = '';
  planFStart: string = `solution = function( `;  // the start string for JS planner function
  planFBody: string = '';
  planFEnd: string = `;`;
  result: string = 'console.log("Eval solution = ") + this.solution;'; 

  sum: any = 0;
  testSumString: string = 'this.sum += 10;';

  constructor() { }

  ngOnInit() {
    // Initialize Problem structures from defaultProject
    this.prRows = h.lines(this.defaultProject);
    this.prTitle = this.prRows[0];

    // Initialize Operation structures from defaultOperation
    this.opRows = h.lines(this.defaultOperation);
    this.opTitle = this.opRows[0];

    console.log("Test eval Solver function from ngOnInit / edit-session");

    // Test eval Solver function - to be launched from Project Start / Stop button(s)

    let entitiesNo = this.prCtxtEntitiesNo;   // should be 3 in eval

    this.opInputFunction = 
    dna.nForHeader(2, '  ', 'i', 1, '<=', 'entitiesNo', '++') + 
    this.testSumString + 
    dna.nForFooter(2, '  ');

    console.log(this.opInputFunction);

    this.solution = eval(this.opInputFunction);

  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
