import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  @Input() isSignedIn?: boolean;
  TournamentName = "";
  user: any;
  tournaments: any = [];
  token: string = '';
  TournamentNameUpate ='';
  TournamentID = 0;
  constructor(private service: ApiserviceService, private router: Router, private authService: AuthService) { 

    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isSignedIn = isAuthenticated;
   
    });

   
  }

  ngOnInit(): void {
    this.TournamentName = this.TournamentName;
    this.TournamentID = this.TournamentID
    this.TournamentName = this.TournamentName
    
    const data = localStorage.getItem('userData');
    this.user = JSON.parse(data!);
   
    if(this.user.token === '')
    {
      this.authService.logout();
      this.router.navigate(['layout/signin']);
    }else{
      console.log(this.user)
      this.token = this.user.token;
      this.getTournaments();
    }

  }
  logout(): void {
    console.log("logout");
    this.authService.logout();
    localStorage.removeItem('userData');
    localStorage.clear();
    this.router.navigate(['layout/signin']);
  }
  addTournament(){
    var tournament  = {
      tournamentName: this.TournamentName
    };
    this.service.addTournament(tournament,this.token).subscribe( response => {
      if(response === true){
        this.getTournaments();
      }else{
        alert("Not Added");
      }
    }, error =>{
      alert("Error occured "+error);
    });
  }
  getTournaments()
  {
     this.service.getTournaments(this.token).subscribe( response =>{
      if(response !== null)
      {
        this.tournaments = response;
      }
    }, error => {
      alert('Error occured');
    });
  }
   editTournament(tournament: any) {
    this.TournamentNameUpate = tournament.tournamentName;
    this.TournamentID = tournament.tournamentId
  }
  updateTournament()
  {
    if(this.TournamentNameUpate === '')
    {
      alert('Tournament name is required');
      return;
    }
    var tournament = {
      TournamentName: this.TournamentNameUpate,
      TournamentId: this.TournamentID
    };
    this.service.updateTournament(tournament, this.token).subscribe( response =>{
      
      if(response === true)
      {
        this.getTournaments();
      }else{
        alert('Error occured updating');
      }
    }, error =>{
      alert('Error occured updating '+error);
    });
  }
  deleteTournament(tournament: any)
  {
    if(confirm('Delete this tournament?')){
      this.service.deleteTounarment(tournament,this.token).subscribe(response => {
        if(response === true)
        {
          alert('Deleted successfully');
          this.getTournaments();
        }
      }, error =>{
        console.log(error);
        alert('Error occured '+error);
      })
    }
  }
}
