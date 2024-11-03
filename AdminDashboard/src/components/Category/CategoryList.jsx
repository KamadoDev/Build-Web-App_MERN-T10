import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaRegEdit } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import SearchBox from "../SearchBox";

const CategoryList = (props) => {
  const { title, isSharedPage } = props;
  // Hàm Edit sản phẩm
  const handleEditProduct = (id) => {
    // Tùy chỉnh code để chỉnh sửa sản phẩm tại đây
    console.log("Edit product:", id);
  };

  // Hàm Xem sản phẩm
  const handleViewProduct = (id) => {
    // Tùy chỉnh code để xem sản phẩm tại đây
    console.log("View product:", id);
  };

  // Hàm Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    // Tùy chỉnh code để xóa sản phẩm tại đây
    console.log("Delete product:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "images",
      headerName: "Image",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <div className="productCell ">
          <div className="imgWrapper shadow overflow-hidden">
            <img src={params.row.images} alt="" />
          </div>
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price ($)",
      type: "number",
      width: 120,
      editable: true,
      renderCell: (params) => (
        <div>
          <span
            style={{
              color: "red",
              textDecoration: "line-through",
              marginRight: 8,
            }}
          >
            {`$${params.row.oldPrice}`}
          </span>
          <span style={{ fontWeight: "bold" }}>{`$${params.row.price}`}</span>
        </div>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "order",
      headerName: "Order",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <strong>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleEditProduct(params.row.id)}>
              <FaRegEdit style={{ fontSize: "18px", color: "#e1950e" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <IconButton onClick={() => handleViewProduct(params.row.id)}>
              <FiEye style={{ fontSize: "18px", color: "#2c78e5" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
              <RiDeleteBin6Line style={{ fontSize: "18px", color: "" }} />
            </IconButton>
          </Tooltip>
        </strong>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      product: "Laptop",
      images: ["https://mironcoder-hotash.netlify.app/images/product/01.webp"],
      category: "Electronics",
      brand: "Dell",
      price: 1000,
      oldPrice: 1200,
      stock: 10,
      order: 5,
    },
    {
      id: 2,
      product: "Phone",
      images: ["https://mironcoder-hotash.netlify.app/images/product/01.webp"],
      category: "Electronics",
      brand: "Samsung",
      price: 800,
      oldPrice: 950,
      stock: 15,
      order: 3,
    },
    {
      id: 3,
      product: "Tablet",
      images: ["https://mironcoder-hotash.netlify.app/images/product/01.webp"],
      category: "Electronics",
      brand: "Apple",
      price: 1200,
      oldPrice: 1400,
      stock: 7,
      order: 4,
    },
    {
      id: 4,
      product: "Headphones",
      images: ["https://mironcoder-hotash.netlify.app/images/product/01.webp"],
      category: "Accessories",
      brand: "Sony",
      price: 200,
      oldPrice: 250,
      stock: 50,
      order: 10,
    },
    // Thêm các dòng khác...
  ];
  return (
    <>
      {!isSharedPage && (
        <div className="card shadow my-4 border-0 flex-center p-3">
          <div className="flex items-center justify-between">
            <h1 className="font-weight-bold mb-0">Products</h1>
            <div className="ml-auto flex items-center gap-3">
              <Button className="btn-sm btn-border">
                <PiExport />
                Export to Excel
              </Button>
              <Link to="/products/create">
                <Button className="btn-sm btn-border btn-blue">
                  <IoMdAdd />
                  Add New Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="card shadow-sm my-4 productList border-0">
        <div className="flex items-center mb-4 justify-between  pt-3 px-4">
          <h2 className="mb-0 font-bold text-md capitalize">{title}</h2>
          <div className="ml-auto">
            <SearchBox />
          </div>
        </div>

        <div className="table-responsive">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            rowHeight={80}
            sx={{
              backgroundColor: "#f5f5f5", // Màu nền tổng thể của DataGrid
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0e0e0", // Màu nền khi di chuột qua hàng
              },
              "& .Mui-selected": {
                backgroundColor: "#d3d3d3 !important", // Màu nền khi chọn hàng
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #ccc", // Màu viền dưới của ô
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

CategoryList.propTypes = {
  title: PropTypes.node.isRequired,
  isSharedPage: PropTypes.bool,
};

export default CategoryList;
