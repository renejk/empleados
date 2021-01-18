import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];


  constructor(private _service: EmpleadoService,private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
  
    this._service.getEmpleado().subscribe((data) => {
      this.empleados=[];
      data.forEach(element => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.empleados);
    });
  }

  deleteEmpleado(id:string){
    this._service.eliminarEmpleado(id).then(()=>{
      this.toastr.error("empleado eliminado con exito","registro eliminado");
    }).catch((error)=>{
      console.log(error);

    })
  }

}
