import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppFormComponent } from '../app-form/app-form.component';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']
})
export class AppTableComponent {

  displayedColumns = ['name', 'status', 'date', 'buttons'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filteredData: Array<any> = new Array<any>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {}

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editRow(data: any) {
    const dialogRef = this.dialog.open(AppFormComponent, {
      width: '700px',
      data: data
    });

  dialogRef.afterClosed().subscribe((data: any) => {

    let index = ELEMENT_DATA.findIndex(x => x.id == data.id);

    ELEMENT_DATA[index].id = data.id;
    ELEMENT_DATA[index].name = data.name;
    ELEMENT_DATA[index].status = data.status;
    ELEMENT_DATA[index].date = data.date;

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    })
  }

  deleteRow(id: number) {
    let index = ELEMENT_DATA.findIndex(x => x.id == id);
    ELEMENT_DATA.splice(index, 1);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }

  fitlerData(value: any) {
    this.filteredData = new Array<any>();

    if(value == 'All') {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    }
    else {
      for(let i = 0; i < ELEMENT_DATA.length; i++) {
        if(value == ELEMENT_DATA[i].status) {
          this.filteredData.push(ELEMENT_DATA[i]);
          this.dataSource = new MatTableDataSource(this.filteredData);
          this.dataSource.sort = this.sort;
        }
      }
    }
  }
}

export interface Element {
  id: number;
  name: string;
  status: string;
  date: string;
}

let ELEMENT_DATA: Element[] = [
  {
    id: 1,
    name: 'Dummy Data 7',
    status: 'Active',
    date: '2022-02-20T09:30:13'
  },
  {
    id: 2,
    name: 'Dummy Data 1',
    status: 'Active',
    date: '2022-02-18T19:25:13'
  },
  {
    id: 3,
    name: 'Dummy Data 9',
    status: 'Completed',
    date: '2022-01-18T12:43:58'
  },
  {
    id: 4,
    name: 'Dummy Data 3',
    status: 'Completed',
    date: '2022-01-13T19:05:13'
  },
  {
    id: 5,
    name: 'Dummy Data 6',
    status: 'Completed',
    date: '2022-01-25T13:13:13'
  },
  {
    id: 6,
    name: 'Dummy Data 2',
    status: 'Active',
    date: '2022-02-18T02:17:13'
  },
  {
    id: 7,
    name: 'Dummy Data 8',
    status: 'Completed',
    date: '2022-02-20T09:30:13'
  },
  {
    id: 8,
    name: 'Dummy Data 5',
    status: 'Active',
    date: '2022-02-13T11:30:13'
  },
  {
    id: 9,
    name: 'Dummy Data 4',
    status: 'Active',
    date: '2021-12-12T09:30:13'
  }
]
