import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox, {checkboxClasses} from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import { blue, whiteA, yellow } from '@radix-ui/colors';
import { useHistory } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E8B57",
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  [`&.${checkboxClasses.colorPrimary}`]: {
    color: "#2E8B57",
  },
  [`&.${checkboxClasses.colorSecondary}`]: {
    color: "#ffffff",
  },
}));

const StyledCheckboxPrimary = styled(Checkbox)(() => ({
  [`&.${checkboxClasses.colorPrimary}`]: {
    color: "#ffffff",
  },
  [`&.${checkboxClasses.colorSecondary}`]: {
    color: "#ffffff",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Floral',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
  },
  {
    id: 'group',
    numeric: true,
    disablePadding: false,
    label: 'Grupo',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Ações',
  },
];

interface TableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function TableHeadFloral(props: TableProps) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
        <Tooltip title="Selecionar todos os Florais">
          <StyledCheckboxPrimary
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            title="Selecionar todos"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
          </Tooltip>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
           {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  dataFloralSelected: readonly string[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, dataFloralSelected } = props;
  const history = useHistory();

  const handleClickNewRecipe = () => {
    history.push({
      pathname: `/Receita`,
      state: {
        dataFloralSelected
      }
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="h6"
          component="div"
        >
          Número de florais selecionados: {numSelected} 
        </Typography>
      )}
      {numSelected > 0 ? (
         <Tooltip title="Adicionar florais selecionados á receita">
         <IconButton size="medium" onClick={handleClickNewRecipe} style={{ background: blue.blue12, color: whiteA.whiteA12, borderRadius: 5}}>
         <AddIcon/> Nova Receita
         </IconButton>
       </Tooltip>     
      ) : (
        <Tooltip title="Adicionar nova Essência Floral">
          <IconButton size="medium" color="primary" onClick={() => history.push("/floral/new")} style={{ background: blue.blue12, color: whiteA.whiteA12, borderRadius: 5}}>
           <AddIcon/> Adicionar Floral
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function TableFloral({ data }: any) {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const history = useHistory();

  const rows = data;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n: any) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClickEdit = (
    id: number,
    name?: string,
    description?: string,
  ) => {
    history.push({
      pathname: `/floral/${id}`,
      state: {
        name,
        description
      }
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} dataFloralSelected={selected}/>
      
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHeadFloral
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .map((row: any, index: any) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <StyledCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.description}</StyledTableCell>
                      <StyledTableCell align="left">{row.group ? row.group : ""}</StyledTableCell>
                      <StyledTableCell align="left"><>
                      <Tooltip title="Editar Essência Floral">
          <IconButton size="small" color="inherit" onClick={() => handleClickEdit(row.id, row.name, row.description)} style={{ background: yellow.yellow10, borderRadius: 5}}>
           <ModeEditOutlineOutlinedIcon/>  Editar
          </IconButton>
        </Tooltip>
                      </></StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}