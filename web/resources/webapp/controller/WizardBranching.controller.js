sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	'sap/ui/Device',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	"sap/m/MessageToast",
	"sap/ui/core/syncStyleClass",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageBox, Fragment, Device, Filter, Sorter, MessageToast, syncStyleClass, FilterOperator) {
	"use strict";

	var history = {
		prevPaymentSelect: null,
		prevDiffDeliverySelect: null
	};
	
	var selectedButton = null;

	return Controller.extend("sap.m.sample.WizardBranching.controller.WizardBranching", {
		onInit: function () {
			

			
			this._mViewSettingsDialogs = {};
			this._wizard = this.byId("ShoppingCartWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");

			Fragment.load({
				name: "sap.m.sample.WizardBranching.view.ReviewPage",
				controller: this
			}).then(function (oWizardReviewPage) {
				this._oWizardReviewPage = oWizardReviewPage;
				this._oNavContainer.addPage(this._oWizardReviewPage);
			}.bind(this));
			
				
			this.model = new JSONModel("Tree.json");
			this.model.attachRequestCompleted(null, function () {
				this.model.getData().ProductCollection.splice(5, this.model.getData().ProductCollection.length);
				this.model.setProperty("/selectedPayment", "Credit Card");
				this.model.setProperty("/selectedDeliveryMethod", "Standard Delivery");
				this.model.setProperty("/differentDeliveryAddress", false);
				this.model.setProperty("/CashOnDelivery", {});
				this.model.setProperty("/BillingAddress", {});
				this.model.setProperty("/CreditCard", {});
				// this.model.setProperty("/buttonCopy",{});
				this.model.setProperty("/globalFilter", "");
				this.model.setProperty("/availabilityFilterOn", false);
				this.model.setProperty("/cellFilterOn", false);
				this.model.setProperty("/nomdXsel", false);
				this.model.setProperty("/nomDiamX", "");
				this.model.setProperty("/outerDiamX", "");
				this.calcTotal();
				this.model.updateBindings();
			}.bind(this));

			this.model.loadData(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
			this.getView().setModel(this.model);
			
			console.log(this.getView().byId("table")._iBindingLength);
			

		},
		
		
		
		onNextEvent: function(oValue) {
			// console.log(oEvent.getParameter("rowContext"));
			
			if(this.byId("table").getSelectedIndices().length !== 0) {
				this.byId("nextB").setVisible(true);
			} else {
				this.byId("nextB").setVisible(false);
			}
			
		},
	
		_filter : function() {
			var oFilter = null;

			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}

			this.byId("table").getBinding("rows").filter(oFilter, "Application");
		},

		filterGlobally : function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;

			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("PROD_CODE", FilterOperator.Contains, sQuery)
				], false);
			}

			this._filter();
		},


		onSaveItem: function (oEvent){
			
			var indices = this.byId("table").getSelectedIndices();
		    var oNom = this.model.getProperty("/nomDiamX");
		    var oNom1 = this.model.getProperty("/outerDiamX");
		    var oNom2 = this.model.getProperty("/innerDiamX");
		    var oNom3 = this.model.getProperty("/ribHeightX");
		    var oNom4 = this.model.getProperty("/ribLengthX");
		    var oNom5 = this.model.getProperty("/theWeightX");
		    var oNom6 = this.model.getProperty("/pipeLengthX");
		    var oNom7 = this.model.getProperty("/socketLengthX");
		    var oNom8 = this.model.getProperty("/innSocketLX");
		    var oNom9 = this.model.getProperty("/prodCodeX");
		    var oNom10 = this.model.getProperty("/categoryInputX");
		    
		    var oEdit1 = this.model.getProperty("/nomdXsel");
		    var oEdit2 = this.model.getProperty("/outInXsel");
		    var oEdit3 = this.model.getProperty("/innerDiamXsel");
		    var oEdit4 = this.model.getProperty("/ribHeightXsel");
		    var oEdit5 = this.model.getProperty("/ribLengthXsel");
		    var oEdit6 = this.model.getProperty("/theWeightXsel");
		    var oEdit7 = this.model.getProperty("/pipeLengthXsel");
		    var oEdit8 = this.model.getProperty("/socketLengthXsel");
		    var oEdit9 = this.model.getProperty("/innSocketLXsel");
		    var oEdit10 = this.model.getProperty("/prodCodeXsel");
		    var oEdit11 = this.model.getProperty("/categoryInputXsel");
		    
		    
		    
		    var oModel = this.getView().getModel("userModel");
		    

			     for (var i = 0; i  < indices.length; i++){
					var oContext = this.byId("table").getContextByIndex(indices[i]);
					if(oEdit1 === true && oNom.length !== 0  ){
					
					oContext.setProperty("NOM_DIAM_DN", oNom);}
					if(oEdit2 === true && oNom1.length !==0){
					
					oContext.setProperty("OUT_DIAM_DOUT", oNom1);}
					if(oEdit3 === true && oNom2.length !==0){
					
					oContext.setProperty("INN_DIAM_DIN", oNom2);}
					if(oEdit4 === true && oNom3.length !==0){
					
					oContext.setProperty("R_HEIGTH_H", oNom3);}
					if(oEdit5 === true && oNom4.length !==0){
					
					oContext.setProperty("R_LENGTH_L", oNom4);}
					if(oEdit6 === true && oNom5.length !==0 ){
					
					oContext.setProperty("WEIGHT", oNom5);}
					if(oEdit7 === true && oNom6.length !==0 ){
						
					oContext.setProperty("PIPE_LENGTH", oNom6);}
					if(oEdit8 === true && oNom7.length !==0 ){
						
					oContext.setProperty("SOCKET_LENGTH", oNom7);}
					if(oEdit9 === true && oNom8.length !==0){
					
					oContext.setProperty("INN_SOCKET_DIAM", oNom8);}
					if(oEdit10 === true && oNom9.length !==0) {
			
					oContext.setProperty("PROD_CODE", oNom9);}
					if(oEdit11 === true && oNom10.length !==0){
					
					oContext.setProperty("CATEGORY", oNom10);}
					
					
				}
				
				oModel.submitBatch("peopleGroup");
							MessageToast.show(
				"Replacement successfull!"
			);
				
			
			this._oDialog.close();
			
		},
		
		onChangeStates: function(evt) {
	
			if(evt.getSource().getValue().length > 0){
				this.byId("save").setEnabled(true);
				evt.getSource().setValueState("Success");
			} else {
				this.byId("save").setEnabled(false);
				evt.getSource().setValueState("Warning");
			}

			
		},
				

		filterPrice : function(oEvent) {
			var oColumn = oEvent.getParameter("column");
			if (oColumn != this.byId("cat1")) {
				return;
			}

			oEvent.preventDefault();

			var sValue = oEvent.getParameter("value");

			function clear() {
				this._oPriceFilter = null;
				oColumn.setFiltered(false);
				this._filter();
			}

			if (!sValue) {
				clear.apply(this);
				return;
			}

			var fValue = null;
			try {
				fValue = parseFloat(sValue, 10);
			} catch (e){
				// nothing
			}

			if (!isNaN(fValue)) {
				this._oPriceFilter = new Filter("Price", FilterOperator.BT, fValue - 20, fValue + 20);
				oColumn.setFiltered(true);
				this._filter();
			} else {
				clear.apply(this);
			}
		},

		clearAllFilters : function(oEvent) {
			var oTable = this.byId("table");

			var oUiModel = this.getView().getModel();
			oUiModel.setProperty("/globalFilter", "");
			oUiModel.setProperty("/availabilityFilterOn", false);

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			this._filter();

			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
		},

		toggleAvailabilityFilter : function(oEvent) {
			this.byId("availability").filter(oEvent.getParameter("pressed") ? "X" : "");
		},

		formatAvailableToObjectState : function(bAvailable) {
			return bAvailable ? "Success" : "Error";
		},		
		
		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			return oDialog;
		},		
		
		onCopy: function (oEvent) {
			var oButton = oEvent.getSource();
			if (this.selectedButton){
				this.selectedButton.setType("Ghost");
			}
			this.selectedButton = oButton;
			this.selectedButton.setType("Emphasized");
			
			
			var oProd = oEvent.getSource().getBindingContext("userModel").getObject().PROD_CODE;
			this.byId("chosenItem").setText(oProd+" Detailed Information");
			var oNomd = oEvent.getSource().getBindingContext("userModel").getObject().NOM_DIAM_DN;
			var oOutd = oEvent.getSource().getBindingContext("userModel").getObject().OUT_DIAM_DOUT;
			var oInnd = oEvent.getSource().getBindingContext("userModel").getObject().INN_DIAM_DIN;
			var oRhei = oEvent.getSource().getBindingContext("userModel").getObject().R_HEIGTH_H;
			var oRlen = oEvent.getSource().getBindingContext("userModel").getObject().R_LENGTH_L;
			var oWeightx = oEvent.getSource().getBindingContext("userModel").getObject().WEIGHT;
			var oPlen = oEvent.getSource().getBindingContext("userModel").getObject().PIPE_LENGTH;
			var oSlen = oEvent.getSource().getBindingContext("userModel").getObject().SOCKET_LENGTH;
			var oCat = oEvent.getSource().getBindingContext("userModel").getObject().CATEGORY;
			var oInSlen = oEvent.getSource().getBindingContext("userModel").getObject().INN_SOCKET_DIAM;
			
			this.byId("nomd").setValue(oNomd+" mm");
			this.byId("outerd").setValue(oOutd+" mm");
			this.byId("innerd").setValue(oInnd+" mm");
			this.byId("ribh").setValue(oRhei+" mm");
			this.byId("ribl").setValue(oRlen+" mm");
			this.byId("theweight").setValue(oWeightx+" kg");
			this.byId("pipel").setValue(oPlen+" m");
			this.byId("socketl").setValue(oSlen+" mm");
			this.byId("innsocketDd").setValue(oInSlen+" mm");
			this.byId("prodcode").setValue(oProd+" code");
			this.byId("category").setValue(oCat+" pipes");

			MessageToast.show(
				"Item "+oProd+" sucessfully copied!"
			);
		
		},
		
		onStates: function() {
				if(this.byId("nomIn").getValue().length > 0) {
				
				this.byId("nomIn").setValueState("Success");  
				this.byId("nomIn").setValueStateText(""); 
			} else { this.byId("nomIn").setValueState("Error"); }
			
			if(this.byId("outIn").getValue().length > 0) {
				this.byId("outIn").setValueState("Success");    
				this.byId("outIn").setValueStateText(""); 
			} else {this.byId("outIn").setValueState("Error"); }
			
			if(this.byId("innIn").getValue().length > 0) {
				this.byId("innIn").setValueState("Success");    
				this.byId("innIn").setValueStateText(""); 
				
			} else { this.byId("innIn").setValueState("Error");     } 
			
			if(this.byId("ribH").getValue().length > 0) {
				this.byId("ribH").setValueState("Success");    
				this.byId("ribH").setValueStateText("Good!"); 
				
			} else { this.byId("ribH").setValueState("Error");     } 
			
			if(this.byId("ribL").getValue().length > 0) {
				this.byId("ribL").setValueState("Success");    
				this.byId("ribL").setValueStateText("Good!"); 
				
			} else { this.byId("ribL").setValueState("Error");     } 
			
			if(this.byId("theWeight").getValue().length > 0) {
				this.byId("theWeight").setValueState("Success");    
				this.byId("theWeight").setValueStateText("Good!"); 
				
			} else { this.byId("theWeight").setValueState("Error");     } 				
			
			if(this.byId("pipeL").getValue().length > 0) {
				this.byId("pipeL").setValueState("Success");    
				this.byId("pipeL").setValueStateText("Good!"); 
				
			} else { this.byId("pipeL").setValueState("Error");     } 
			
			
			if(this.byId("socketL").getValue().length > 0) {
				this.byId("socketL").setValueState("Success");    
				this.byId("socketL").setValueStateText("Good!"); 
				
			} else { this.byId("socketL").setValueState("Error");     } 		
			
			if(this.byId("prodC").getValue().length > 0) {
				this.byId("prodC").setValueState("Success");    
				this.byId("prodC").setValueStateText("Good!"); 
				
			} else { this.byId("prodC").setValueState("Error");     } 		
			
			if(this.byId("innsocketD").getValue().length > 0) {
				this.byId("innsocketD").setValueState("Success");    
				this.byId("innsocketD").setValueStateText("Good!"); 
				
			} else { this.byId("innsocketD").setValueState("Error");     } 		
			//textins 1
			
			this.byId("textins").setValue("Item " + 
			this.byId("prodC").getValue() 
			+ " has nominal diameter of " 
			+ this.byId("nomIn").getValue() 
			+ " mm and outer diameter of " 
			+  this.byId("outIn").getValue() 
			+ " mm." 
			+ " The inner diameter of this item is "
			+ this.byId("innIn").getValue()+ " mm."
			+ " Ribs height and length are accordingly "
			+ this.byId("ribH").getValue() + " and " + this.byId("ribL").getValue() + " mm."
			+ " Weight of the item is " + this.byId("theWeight").getValue() + " kg's."  
			+ " Pipes length is " + this.byId("pipeL").getValue() + " m and Socket length is " + this.byId("socketL").getValue() + " mm."
			+ " The inner socket diameter is " + this.byId("innsocketD").getValue() + " mm."
			+ "  The category that the Item belogs to is: " + this.byId("catInput").getValue() + ".");
			//textins2 
			this.byId("textins2").setValue("Item " + 
			this.byId("prodcode").getValue() 
			+ " has nominal diameter of " 
			+ this.byId("nomd").getValue() 
			+ " and outer diameter of " 
			+  this.byId("outerd").getValue() 
			+ "." 
			+ " The inner diameter of this item is "
			+ this.byId("innerd").getValue()+ ". "
			+ "Ribs height and length are accordingly "
			+ this.byId("ribh").getValue() + " and " + this.byId("ribl").getValue() + ". "
			+ "Weight of the item is " + this.byId("theweight").getValue() + ". "  
			+ "Pipes length is " + this.byId("pipel").getValue() + " and Socket length is " + this.byId("socketl").getValue() + ". "
			+ "The inner socket diameter is " + this.byId("pipel").getValue() + ". "
			+ "The category that the Item belogs to is: " + this.byId("category").getValue() + ".");			
			
		},	
		
		onSelectDialogPress: function() {
				
				this.byId("catInput").setVisible(true);
					if (!this._o1Dialog) {
				Fragment.load({
					name: "sap.m.sample.WizardBranching.view.Dialog",
					controller: this
				}).then(function(oDialog){
					this._o1Dialog = oDialog;
					this.getView().addDependent(this._o1Dialog);
					this._o1Dialog.open();
					console.log(sap.ui.getCore().byId("Tree"));
				}.bind(this));
			} else {
				console.log("x");
				this._o1Dialog.open();
			}		
				
		},
		
		onOpenNextDialog: function() {
				var oView = this.getView();
					if (!this._oDialog) {
				Fragment.load({
					id: oView.getId(),
					name: "sap.m.sample.WizardBranching.view.NextDialog",
					controller: this
				}).then(function(oDialog){
					this._oDialog = oDialog;
					this.getView().addDependent(this._oDialog);
					this._oDialog.open();
					this.model.setProperty("/nomdXsel", false);
					this.model.setProperty("/outInXsel", false);
					this.model.setProperty("/innerDiamXsel", false);
					this.model.setProperty("/ribHeightXsel", false);
					this.model.setProperty("/ribLengthXsel", false);
					this.model.setProperty("/theWeightXsel", false);
					this.model.setProperty("/pipeLengthXsel", false);
					this.model.setProperty("/socketLengthXsel", false);
					this.model.setProperty("/innSocketLXsel", false);
					this.model.setProperty("/prodCodeXsel", false);
					this.model.setProperty("/categoryInputXsel", false);
					this.byId("nomInX").getValue();
					
				}.bind(this));
			} else {
				this._oDialog.open();
			}				
		},
		
		
		onRefresh: function(){
			var oBinding = this.byId("table").getBinding("rows");
			var oBinding1 = this.byId("idProductsTableTwo").getBinding("items");
			var oContext = this.getView().byId("table")._iBindingLength;
			console.log(oContext);     
			this.byId("title").setText("PipeLife Item Overview - "+"("+oContext+" items total)"); 
			oBinding.refresh();
		    oBinding1.refresh();
			
			MessageToast.show("<< Refreshed >>");
		},
		
				_setUIChanges : function (bHasUIChanges) {
			if (this._bTechnicalErrors) {
				// If there is currently a technical error, then force 'true'.
				bHasUIChanges = true;
			} else if (bHasUIChanges === undefined) {
				bHasUIChanges = this.getView().getModel().hasPendingChanges();
			}
			var oModel = this.getView().getModel();
			oModel.setProperty("/hasUIChanges", bHasUIChanges);
		},
		
				_setBusy : function (bIsBusy) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/busy", bIsBusy);
		},
		
		closeDialog: function () {
			
			var oBinding = this.byId("table").getBinding("rows");
			var oBinding1 = this.byId("idProductsTableTwo").getBinding("items");
			oBinding.refresh();
			oBinding1.refresh();
			
			MessageToast.show("Changes have been saved ! ");
				
			if (!this._o1Dialog) {
				Fragment.load({
					name: "opensap.odataBasic.view.Dialog",
					controller: this
				}).then(function(oDialog){
					this._o1Dialog = oDialog;
					this._o1Dialog.close();
				}.bind(this));
			} else {
				this._o1Dialog.close();
			}
		},		
		
		onCloseDialog: function(oEvent) {
	
			this._oDialog.close();
			
		},		
		
			onTreeActions: function (oEvent) {
			   
				
			var tSelected = oEvent.getSource().getSelectedItems();
			this.getView().getModel().setProperty("/treeSelected", "Rejected");
			var docsArray = [];
			        for (var i = 0; i < tSelected.length; i++) {
								var docs = tSelected[i].getBindingContext().getObject().text;
								docsArray.push(docs);
							}
					var xdd = docsArray.join();		
					console.log(xdd);
			
			this.getView().getModel().setProperty("/categoryInput", xdd);     			
	
		},
		
		
		handleImage3Press: function(evt) {
			console.log(evt.getSource());
			
			MessageToast.show("Pipe Image has been pressed.");
		},		
		

		handleSortButtonPressed: function () {
			this.createViewSettingsDialog("sap.m.sample.WizardBranching.view.SortDialog").open();
		},

		handleFilterButtonPressed: function () {
			this.createViewSettingsDialog("sap.m.sample.WizardBranching.view.FilterDialog").open();
		},	

		handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("table"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("rows"),
				aFilters = [];

			mParams.filterItems.forEach(function(oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabel").setText(mParams.filterString);
			this.byId("vsdFilterBarr").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabell").setText(mParams.filterString);			
		},		
		
		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("table"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("rows"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		},		
		

		calcTotal: function () {
			var data = this.model.getData().ProductCollection;
			if (data) {
				var total = data.reduce(function (prev, current) {
					prev = prev.Price || prev;
					return prev + current.Price;
				});
				this.model.setProperty("/ProductsTotalPrice", total.Price || total);
			} else {
				this.model.setProperty("/ProductsTotalPrice", 0);
			}
		},

		handleDelete: function (listItemBase) {
			var listItem = listItemBase.mParameters.listItem;
			var data = this.model.getData().ProductCollection;
			if (data.length <= 1) {
				return;
			}

			for (var i = 0; i < data.length; i++) {
				if (data[i].Name === listItem.getTitle()) {
					data.splice(i, 1);
					this.calcTotal();
					this.model.updateBindings();
					break;
				}
			}
		},

		goToPaymentStep: function () {
			var selectedKey = this.model.getProperty("/selectedPayment");

			switch (selectedKey) {
				case "Credit Card":
					this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CreditCardStep"));
					break;
				case "Bank Transfer":
					this.byId("PaymentTypeStep").setNextStep(this.getView().byId("BankAccountStep"));
					break;
				case "Cash on Delivery":
				default:
					this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CreditCardStep"));
					break;
			}
		},

		setPaymentMethod: function () {
			this.setDiscardableProperty({
				message: "Are you sure you want to change the Item type ? This will discard your progress.",
				discardStep: this.byId("PaymentTypeStep"),
				modelPath: "/selectedPayment",
				historyPath: "prevPaymentSelect"
			});
		},

		setDifferentDeliveryAddress: function () {
			this.setDiscardableProperty({
				message: "Are you sure you want to change the delivery address ? This will discard your progress",
				discardStep: this.byId("BillingStep"),
				modelPath: "/differentDeliveryAddress",
				historyPath: "prevDiffDeliverySelect"
			});
		},

		setDiscardableProperty: function (params) {
			if (this._wizard.getProgressStep() !== params.discardStep) {
				MessageBox.warning(params.message, {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							this._wizard.discardProgress(params.discardStep);
							history[params.historyPath] = this.model.getProperty(params.modelPath);
						} else {
							this.model.setProperty(params.modelPath, history[params.historyPath]);
						}
					}.bind(this)
				});
			} else {
				history[params.historyPath] = this.model.getProperty(params.modelPath);
			}
		},

		billingAddressComplete: function () {
			if (this.model.getProperty("/differentDeliveryAddress")) {
				this.byId("BillingStep").setNextStep(this.getView().byId("DeliveryAddressStep"));
			} else {
				this.byId("BillingStep").setNextStep(this.getView().byId("DeliveryTypeStep"));
			}
		},

		handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your purchase?", "warning");
		},
		
		onDeleteRecord: function () {
			
			var oSelected = this.byId("table").getSelectedIndices();
			
			console.log(oSelected);
			
			if (oSelected) {
				oSelected.getBindingContext("userModel").delete("$auto").then(function () {
					MessageToast.show("Record Deleted Sucessfully!");
				}.bind(this), function (oError) {
					MessageBox.error(oError.message);
				});
			}
		},		
		
		onCreateRecord: function () {
			
			try {
				var result = this.getView().getModel().getData();
				var oModel = this.getView().getModel("userModel");
				if (result.nomDiam.length === 0 || result.nomDiam.length === undefined){
								MessageToast.show("404");
				}				
				
				
				var oList = this.byId("table"),
					oBinding = oList.getBinding("rows");
					console.log(oBinding);
					var	oContext = oBinding.create({
						"ITEM_ID": "0",
						"NOM_DIAM_DN": result.nomDiam,
						"OUT_DIAM_DOUT": result.outerDiam,
						"INN_DIAM_DIN": result.innerDiam,
						"R_HEIGTH_H": result.ribHeight,
						"R_LENGTH_L": result.ribLength,
						"WEIGHT": result.theWeight,
						"PIPE_LENGTH": result.pipeLength,
						"SOCKET_LENGTH": result.socketLength,
						"INN_SOCKET_DIAM": result.innSocketL,
						"PROD_CODE": result.prodCode,
						"CATEGORY": result.categoryInput
					});
						oModel.submitBatch("peopleGroup");
						// sap.m.MessageBox.alert("Correct NMR code!");
						// Note: this promise fails only if the transient entity is deleted
						oContext.created().then(function () {
							sap.m.MessageBox.alert("Item with code: " + oContext.getProperty("PROD_CODE")+ " created!");
						}, function (oError) {
							sap.m.MessageBox.alert(oError.toString());
						});
					
			} catch (err) {
				sap.m.MessageBox.alert(err.toString());
			}
		},		
		
		onCreateRecord1: function () {
			
			try {
				var oModel = this.getView().getModel("userModel");
				var result = this.getView().getModel().getData();
				var oList = this.byId("table"),
					oBinding = oList.getBinding("rows");
					
					var	oContext = oBinding.create({
						"ITEM_ID": "0",
						"NOM_DIAM_DN": result.nomDiam1.split(" ")[0],
						"OUT_DIAM_DOUT": result.outerDiam1.split(" ")[0],
						"INN_DIAM_DIN": result.innerDiam1.split(" ")[0],
						"R_HEIGTH_H": result.ribHeight1.split(" ")[0],
						"R_LENGTH_L": result.ribLength1.split(" ")[0],
						"WEIGHT": result.theWeight1.split(" ")[0],
						"PIPE_LENGTH": result.pipeLength1.split(" ")[0],
						"SOCKET_LENGTH": result.socketLength1.split(" ")[0],
						"INN_SOCKET_DIAM": result.innSocketL1.split(" ")[0],
						"PROD_CODE": result.prodCode1.split(" ")[0]+ " " +result.prodCode1.split(" ")[1],
						"CATEGORY": result.categoryInput1.split(" ")[0]
					});
						oModel.submitBatch("peopleGroup");
						// sap.m.MessageBox.alert("Correct NMR code!");
						// Note: this promise fails only if the transient entity is deleted
						oContext.created().then(function () {
							sap.m.MessageBox.alert("Item with code: " + oContext.getProperty("PROD_CODE")+ " created!");
						}, function (oError) {
							sap.m.MessageBox.alert(oError.toString());
						});
					
			} catch (err) {
				sap.m.MessageBox.alert(err.toString());
			}
		},		
		
		

		handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},

		backToWizardContent: function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},

		checkCreditCardStep: function () {
			var cardName = this.model.getProperty("/CreditCard/Name") || "";
			if (cardName.length < 3) {
				this._wizard.invalidateStep(this.byId("CreditCardStep"));
			} else {
				this._wizard.validateStep(this.byId("CreditCardStep"));
			}
		},

		checkCashOnDeliveryStep: function () {
			var firstName = this.model.getProperty("/CashOnDelivery/FirstName") || "";
			if (firstName.length < 3) {
				this._wizard.invalidateStep(this.byId("CashOnDeliveryStep"));
			} else {
				this._wizard.validateStep(this.byId("CashOnDeliveryStep"));
			}
		},

		checkBillingStep: function () {
			var address = this.model.getProperty("/BillingAddress/Address") || "";
			var city = this.model.getProperty("/BillingAddress/City") || "";
			var zipCode = this.model.getProperty("/BillingAddress/ZipCode") || "";
			var country = this.model.getProperty("/BillingAddress/Country") || "";

			if (address.length < 3 || city.length < 3 || zipCode.length < 3 || country.length < 3) {
				this._wizard.invalidateStep(this.byId("BillingStep"));
			} else {
				this._wizard.validateStep(this.byId("BillingStep"));
			}
		},

		completedHandler: function () {
			this._oNavContainer.to(this._oWizardReviewPage);
		},

		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
						this._navBackToList();
					}
				}.bind(this)
			});
		},

		_navBackToList: function () {
			this._navBackToStep(this.byId("ContentsStep"));
		},

		_navBackToPaymentType: function () {
			this._navBackToStep(this.byId("PaymentTypeStep"));
		},

		_navBackToCreditCard: function () {
			this._navBackToStep(this.byId("CreditCardStep"));
		},

		_navBackToCashOnDelivery: function () {
			this._navBackToStep(this.byId("CashOnDeliveryStep"));
		},

		_navBackToBillingAddress: function () {
			this._navBackToStep(this.byId("BillingStep"));
		},

		_navBackToDeliveryType: function () {
			this._navBackToStep(this.byId("DeliveryTypeStep"));
		},

		_navBackToStep: function (step) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(step);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this._oNavContainer.to(this._oWizardContentPage);
		}
	});
});