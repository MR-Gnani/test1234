(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("base_emp");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,760,645);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_emp", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/><Column id=\"LAST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"HIRE_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID\" type=\"INT\" size=\"256\"/><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"EMPLOYEE_ID\">1</Col><Col id=\"LAST_NAME\"/><Col id=\"FIRST_NAME\">nani</Col><Col id=\"EMAIL\">nani@nate.com</Col><Col id=\"HIRE_DATE\">20240801</Col><Col id=\"MANAGER_ID\">5</Col><Col id=\"JOB_TITLE\">프로</Col></Row><Row><Col id=\"EMPLOYEE_ID\">2</Col><Col id=\"FIRST_NAME\">hojung</Col><Col id=\"EMAIL\">yun@nate.com</Col><Col id=\"HIRE_DATE\">20232344</Col><Col id=\"MANAGER_ID\">3</Col><Col id=\"JOB_TITLE\">박사</Col></Row><Row><Col id=\"EMPLOYEE_ID\">3</Col><Col id=\"FIRST_NAME\">yang</Col><Col id=\"EMAIL\">dae@nate.com</Col><Col id=\"HIRE_DATE\">202323324</Col><Col id=\"MANAGER_ID\">3</Col><Col id=\"JOB_TITLE\">연구원</Col></Row><Row><Col id=\"EMPLOYEE_ID\">4</Col><Col id=\"FIRST_NAME\">bling</Col><Col id=\"EMAIL\">ii@nate.com</Col><Col id=\"HIRE_DATE\">223322222</Col><Col id=\"MANAGER_ID\">5</Col><Col id=\"JOB_TITLE\">백수</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_searchList", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("btn_search", "absolute", "57.63%", "17", null, "25", "34.34%", null, this);
            obj.set_taborder("0");
            obj.set_text("search");
            this.addChild(obj.name, obj);

            obj = new Button("btn_add", "absolute", "66.18%", "17", null, "25", "25.53%", null, this);
            obj.set_taborder("1");
            obj.set_text("add");
            this.addChild(obj.name, obj);

            obj = new Button("btn_del", "absolute", "74.87%", "17", null, "25", "17.11%", null, this);
            obj.set_taborder("2");
            obj.set_text("del");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save", "absolute", "83.29%", "17", null, "25", "8.42%", null, this);
            obj.set_taborder("3");
            obj.set_text("save");
            this.addChild(obj.name, obj);

            obj = new Edit("edit_name", "absolute", "9.08%", "61", null, "23", "79.08%", null, this);
            obj.set_taborder("4");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_title", "absolute", "2.11%", "21", null, "15", "76.05%", null, this);
            obj.set_taborder("5");
            obj.set_text("Employee Management");
            obj.style.set_background("lightyellow");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 ta,Tahoma");
            this.addChild(obj.name, obj);

            obj = new Calendar("calFrom", "absolute", "29.74%", "61", null, "24", "53.55%", null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("7");

            obj = new Calendar("calTo", "absolute", "48.42%", "61", null, "24", "33.95%", null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("8");

            obj = new Static("strName", "absolute", "4.21%", "61", null, "23", "91.45%", null, this);
            obj.set_taborder("9");
            obj.set_text("이름");
            obj.style.set_font("10 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("strDate", "absolute", "23.42%", "61", null, "24", "69.21%", null, this);
            obj.set_taborder("10");
            obj.set_text("고용일");
            this.addChild(obj.name, obj);

            obj = new Combo("strComMGR", "absolute", "78.95%", "62", null, "21", "7.89%", null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("11");
            obj.set_text("- 전체 -");

            obj = new Static("strManager", "absolute", "71.71%", "63", null, "20", "21.97%", null, this);
            obj.set_taborder("12");
            obj.set_text("관리자");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "4.08%", "96", null, "228", "7.5%", null, this);
            obj.set_taborder("13");
            obj.set_binddataset("ds_emp");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"124\"/><Column size=\"119\"/><Column size=\"109\"/><Column size=\"88\"/><Column size=\"135\"/><Column size=\"97\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"관리번호\"/><Cell col=\"1\" text=\"직책\"/><Cell col=\"2\" text=\"이름\"/><Cell col=\"3\" text=\"EMAIL\"/><Cell col=\"4\" text=\"고용일\"/><Cell col=\"5\" text=\"관리자명\"/></Band><Band id=\"body\"><Cell text=\"bind:EMPLOYEE_ID\"/><Cell col=\"1\" text=\"bind:JOB_TITLE\"/><Cell col=\"2\" text=\"bind:FIRST_NAME\"/><Cell col=\"3\" text=\"bind:EMAIL\"/><Cell col=\"4\" text=\"bind:HIRE_DATE\"/><Cell col=\"5\" text=\"bind:MANAGER_ID\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Edit("edtEMPID", "absolute", "30.53%", "15", null, "25", "58.95%", null, this);
            obj.set_enable("true");
            obj.set_taborder("14");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 760, 645, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("base_emp.xfdl", function(exports) {

        this.btn_search_onclick = function(obj,e)
        {
        	/*trace("내가 입력한 숫자" + this.edtEMPID.value);*/
        	var employeeId = this.edtEMPID.value;

        	this.ds_searchList.clearData();
        	this.ds_searchList.addRow();
        	this.ds_searchList.setColumn(0,"EMPLOYEE_ID", employeeId);
        	
        	var jsonData = {
        		"EMPLOYEE_ID": employeeId
        	}
        	
        	var jsonStr = JSON.stringify(jsonData);
        	/*trace("JSON 객체" + jsonStr);*/
        	
        	var strSvcId = "selectUserList";
        	var strSvcUrl = "/api/selectUserList";
        	var inData = "jsonData=" + encodeURIComponent(jsonStr); // json 데이터 URI 인코딩
        	var outData = "ds_emp=ds_emp";
        	var strAvg = "";
        	var callBackFnc = "fnCallback";
        	/*trace("인코딩 데이터" + inData);*/
        	
        	application.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        };

        this.btn_add_onclick = function(obj,e)
        {
        	this.callMethod();
        }

        this.callMethod = function()
        {
        	var strSvcId = "baseId";
        	var strSvcUrl = "http://localhost:8080/base";
        	var inData = "inDataset=ds_emp"
        	var outData = "ds_emp=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fnCallback2";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        this.fnCallback = function(strSvcId,nErrorCode,strErrorMsg) {
        	if (nErrorCode === 0) {
        		var response = this.ds_emp.getAll();
        		var jsonResponse = JSON.parse(response); 

        		this.ds_emp.loadXML(jsonResponse);
        	} else {
                trace("Error: " + strErrorMsg);
        	}
        };

        
        this.fnCallback2 = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		trace(strSvcId);
        	}
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.base_emp_onload, this);
            this.btn_search.addEventHandler("onclick", this.btn_search_onclick, this);
            this.btn_add.addEventHandler("onclick", this.btn_add_onclick, this);
            this.edit_name.addEventHandler("oneditclick", this.edit_name_oneditclick, this);
            this.edtEMPID.addEventHandler("oneditclick", this.edtEMPID_oneditclick, this);

        };

        this.loadIncludeScript("base_emp.xfdl", true);

       
    };
}
)();
