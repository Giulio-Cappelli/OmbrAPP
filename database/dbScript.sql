-- database creation
create database ombrappdb;
use ombrappdb;





-- tables creation
create table fornitorePagamenti(
    idFornitore int not null auto_increment,
    nome varchar(255) not null,
    primary key (idFornitore)
);

create table tipoUtente(
    idTipo int not null auto_increment,
    nome varchar(255) not null,
    primary key (idTipo)
);

create table tipoSpazio(
    idTipo int not null auto_increment,
    nome varchar(255) not null,
    primary key (idTipo)
);

create table utenti(
    idUtente int not null auto_increment,
    nomeUtente varchar(255) not null,
    password varchar(255) not null,
    email varchar(255),
    nome varchar(255),
    cognome varchar(255),
    tipo int not null,
    primary key (idUtente),
    foreign key (tipo) references tipoUtente(idTipo)
);

create table pagamenti(
    idPagamento int not null auto_increment,
    quantitativo float,
    fornitore int not null,
    utente int not null,
    primary key (idPagamento),
    foreign key (fornitore) references fornitorePagamenti(idFornitore),
    foreign key (utente) references utenti(idUtente)
);

create table prenotazioni(
    idPrenotazione int not null auto_increment,
    data varchar (10) not null,
    pagamento int not null,
    utente int not null,
    primary key (idPrenotazione),
    foreign key (pagamento) references pagamenti(idPagamento),
    foreign key (utente) references utenti(idUtente)
);

create table spazi(
    idSpazio int not null auto_increment,
    cordinataX int,
    cordinataY int,
    tipo int not null,
    primary key (idSpazio),
    foreign key (tipo) references tipoSpazio(idTipo)
);

create table occupazioni(
    prenotazione int not null,
    spazio int not null,    
    primary key (prenotazione, spazio),
    foreign key (prenotazione) references prenotazioni(idPrenotazione),
    foreign key (spazio) references spazi(idSpazio)
);





-- tables population
insert into tipoUtente (nome)
values ('utente');

insert into tipoUtente (nome)
values ('admin');

insert into tipoUtente (nome)
values ('cassa');


insert into tipoSpazio (nome)
values ('vuoto');

insert into tipoSpazio (nome)
values ('attrazione');

insert into tipoSpazio (nome)
values ('bagno');

insert into tipoSpazio (nome)
values ('ombrellone');



insert into fornitorePagamenti (nome)
values ('SatisPay');

insert into fornitorePagamenti (nome)
values ('PayPal');


insert into utenti (nomeUtente, password, email, nome, cognome, tipo)
values ('Mariochefigo', 'Lelucciole12', 'mario.rossiccio@cmail.com', 'Mario', 'Rossiccio', 1);


insert into utenti (nomeUtente, password, email, nome, cognome, tipo)
values ('ImperatriceSuprema', 'PasswordSuperSicura', 'righiAlex@coldmail.com','Alessandra', 'Righi', 2 );


insert into utenti (nomeUtente, password, email, nome, cognome, tipo)
values ('loSchiavo69', 'mi_Licenzio421', 'lucaSoleggiante@inlook.com', 'Luca', 'Soleggiante', 3);


insert into spazi (cordinataX,cordinataY,tipo)
values (0,0,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (1,0,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (2,0,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (0,1,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (1,1,3);

insert into spazi (cordinataX,cordinataY,tipo)
values (2,1,2);

insert into spazi (cordinataX,cordinataY,tipo)
values (0,2,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (1,2,4);

insert into spazi (cordinataX,cordinataY,tipo)
values (2,2,1);