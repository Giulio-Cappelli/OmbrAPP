-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Dic 12, 2021 alle 14:33
-- Versione del server: 10.1.39-MariaDB
-- Versione PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ombrappdb`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `fornitorepagamenti`
--

CREATE TABLE `fornitorepagamenti` (
  `idFornitore` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `fornitorepagamenti`
--

INSERT INTO `fornitorepagamenti` (`idFornitore`, `nome`) VALUES
(1, 'SatisPay'),
(2, 'PayPal');

-- --------------------------------------------------------

--
-- Struttura della tabella `occupazioni`
--

CREATE TABLE `occupazioni` (
  `prenotazione` int(11) NOT NULL,
  `spazio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `occupazioni`
--

INSERT INTO `occupazioni` (`prenotazione`, `spazio`) VALUES
(2, 2),
(2, 3),
(3, 2),
(4, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamenti`
--

CREATE TABLE `pagamenti` (
  `idPagamento` int(11) NOT NULL,
  `quantitativo` float DEFAULT NULL,
  `fornitore` int(11) NOT NULL,
  `utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `pagamenti`
--

INSERT INTO `pagamenti` (`idPagamento`, `quantitativo`, `fornitore`, `utente`) VALUES
(1, 10, 2, 1),
(2, 10, 2, 1),
(3, 10, 2, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `idPrenotazione` int(11) NOT NULL,
  `data` varchar(10) NOT NULL,
  `pagamento` int(11) NOT NULL,
  `utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prenotazioni`
--

INSERT INTO `prenotazioni` (`idPrenotazione`, `data`, `pagamento`, `utente`) VALUES
(2, '2021-12-29', 1, 1),
(3, '2021-12-10', 2, 1),
(4, '2021-12-29', 3, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `spazi`
--

CREATE TABLE `spazi` (
  `idSpazio` int(11) NOT NULL,
  `cordinataX` int(11) DEFAULT NULL,
  `cordinataY` int(11) DEFAULT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `spazi`
--

INSERT INTO `spazi` (`idSpazio`, `cordinataX`, `cordinataY`, `tipo`) VALUES
(1, 0, 0, 4),
(2, 1, 0, 4),
(3, 2, 0, 4),
(4, 0, 1, 4),
(5, 1, 1, 3),
(6, 2, 1, 2),
(7, 0, 2, 4),
(8, 1, 2, 4),
(9, 2, 2, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `tipospazio`
--

CREATE TABLE `tipospazio` (
  `idTipo` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `tipospazio`
--

INSERT INTO `tipospazio` (`idTipo`, `nome`) VALUES
(1, 'vuoto'),
(2, 'attrazione'),
(3, 'bagno'),
(4, 'ombrellone');

-- --------------------------------------------------------

--
-- Struttura della tabella `tipoutente`
--

CREATE TABLE `tipoutente` (
  `idTipo` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `tipoutente`
--

INSERT INTO `tipoutente` (`idTipo`, `nome`) VALUES
(1, 'utente'),
(2, 'admin'),
(3, 'cassa');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `idUtente` int(11) NOT NULL,
  `nomeUtente` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`idUtente`, `nomeUtente`, `PASSWORD`, `email`, `nome`, `cognome`, `tipo`) VALUES
(1, 'Mariochefigo', 'Lelucciole12', 'mario.rossiccio@cmail.com', 'Mario', 'Rossiccio', 1),
(2, 'ImperatriceSuprema', 'PasswordSuperSicura', 'righiAlex@coldmail.com', 'Alessandra', 'Righi', 2),
(3, 'loSchiavo69', 'mi_Licenzio421', 'lucaSoleggiante@inlook.com', 'Luca', 'Soleggiante', 3);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `fornitorepagamenti`
--
ALTER TABLE `fornitorepagamenti`
  ADD PRIMARY KEY (`idFornitore`);

--
-- Indici per le tabelle `occupazioni`
--
ALTER TABLE `occupazioni`
  ADD PRIMARY KEY (`prenotazione`,`spazio`),
  ADD KEY `spazio` (`spazio`);

--
-- Indici per le tabelle `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD PRIMARY KEY (`idPagamento`),
  ADD KEY `fornitore` (`fornitore`),
  ADD KEY `utente` (`utente`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`idPrenotazione`),
  ADD KEY `pagamento` (`pagamento`),
  ADD KEY `utente` (`utente`);

--
-- Indici per le tabelle `spazi`
--
ALTER TABLE `spazi`
  ADD PRIMARY KEY (`idSpazio`),
  ADD KEY `tipo` (`tipo`);

--
-- Indici per le tabelle `tipospazio`
--
ALTER TABLE `tipospazio`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indici per le tabelle `tipoutente`
--
ALTER TABLE `tipoutente`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`idUtente`),
  ADD KEY `tipo` (`tipo`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `fornitorepagamenti`
--
ALTER TABLE `fornitorepagamenti`
  MODIFY `idFornitore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  MODIFY `idPagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `spazi`
--
ALTER TABLE `spazi`
  MODIFY `idSpazio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `tipospazio`
--
ALTER TABLE `tipospazio`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `tipoutente`
--
ALTER TABLE `tipoutente`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `idUtente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `occupazioni`
--
ALTER TABLE `occupazioni`
  ADD CONSTRAINT `occupazioni_ibfk_1` FOREIGN KEY (`prenotazione`) REFERENCES `prenotazioni` (`idPrenotazione`),
  ADD CONSTRAINT `occupazioni_ibfk_2` FOREIGN KEY (`spazio`) REFERENCES `spazi` (`idSpazio`);

--
-- Limiti per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD CONSTRAINT `pagamenti_ibfk_1` FOREIGN KEY (`fornitore`) REFERENCES `fornitorepagamenti` (`idFornitore`),
  ADD CONSTRAINT `pagamenti_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `utenti` (`idUtente`);

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `prenotazioni_ibfk_1` FOREIGN KEY (`pagamento`) REFERENCES `pagamenti` (`idPagamento`),
  ADD CONSTRAINT `prenotazioni_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `utenti` (`idUtente`);

--
-- Limiti per la tabella `spazi`
--
ALTER TABLE `spazi`
  ADD CONSTRAINT `spazi_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipospazio` (`idTipo`);

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utenti_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipoutente` (`idTipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
