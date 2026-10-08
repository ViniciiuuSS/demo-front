import { Component, ChangeDetectorRef, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Cliente } from '../../Model/ClienteModel';
import { ClienteService } from '../../Services/clienteservice';

@Component({
  imports: [MatTableModule],
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table {
  private clienteService: ClienteService = inject(ClienteService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  displayedColumns: string[] = ['#', 'nome', 'cpf', 'edicao'];
  dataSource: Cliente[] = [];

  ngOnInit(){
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.dataSource = clientes;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getClienteByCpf(cpf: string){
    if(!cpf || cpf.trim() === '') {
      this.getClientes();
      return;
    }
    this.clienteService.getClienteByCpf(cpf).subscribe({
      next: (cliente: Cliente) => {
        this.dataSource = [cliente];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  postCliente(cpf: string, nome: string){
    if(!cpf || !nome) {
      console.error('CPF Ou Nome precisam ser preenchidos');
      return;
    }
    const cliente: Cliente = {cpf, nome} as Cliente;
    this.clienteService.postCliente(cliente).subscribe({
      next: (cliente: Cliente) => {
        this.dataSource.push(cliente);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  putCliente(cliente: Cliente){
    if(!cliente.cpf || !cliente.nome) {
      console.error('CPF Ou Nome precisam ser preenchidos');
      return;
    }
    this.clienteService.putCliente(cliente).subscribe({
      next: (cliente: Cliente) => {
        console.log(cliente)
        const index = this.dataSource.findIndex(c => c.cpf === cliente.cpf);
        if(index !== -1) {
          this.dataSource[index] = cliente;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteCliente(cpf: string){
    if(!cpf){
      console.error('CPF precisa ser preenchido');
      return;
    }
    this.clienteService.deleteCliente(cpf).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter(c => c.cpf !== cpf);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
