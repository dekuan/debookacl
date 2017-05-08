/** 
 *	llib
 */
function xslib_extend( oCopyTo, oCopyFrom, bMakeLowerCaseKey )
{
	var sPropName;
	var sPropNameLC;

	for ( sPropName in oCopyFrom )
	{
		if ( $lisb( bMakeLowerCaseKey ) && bMakeLowerCaseKey )
		{
			sPropNameLC = $.trim( sPropName ).toLowerCase();
			oCopyTo[ sPropNameLC ] = oCopyFrom[ sPropName ];
		}
		else
		{
			oCopyTo[ sPropName ] = oCopyFrom[ sPropName ];
		}
	}
}
function $le(){ return xslib_extend.apply( this, arguments ); }

function xslib_is_null( oObj )
{
	var sType;

	sType = $.type( oObj ).toLowerCase();
	return ( "undefined" == sType || "null" == sType );
}
function $lisnul(){ return xslib_is_null.apply( this, arguments ); }

function xslib_is_string( oObj )
{
	return ( "string" == $.type( oObj ).toLowerCase() );
}
function $liss(){ return xslib_is_string.apply( this, arguments ); }

function xslib_is_numeric( oObj )
{
	return ( $.isNumeric( oObj ) );
}
function $lisn(){ return xslib_is_numeric.apply( this, arguments ); }

function xslib_is_bool( oObj )
{
	return ( "boolean" == $.type( oObj ).toLowerCase() );
}
function $lisb(){ return xslib_is_bool.apply( this, arguments ); }

function xslib_is_object( oObj )
{
	return ( oObj && ! $lisnul( oObj ) && "object" == $.type( oObj ).toLowerCase() );
}
function $liso(){ return xslib_is_object.apply( this, arguments ); }

function xslib_is_array( oObj )
{
	return ( oObj && ! $lisnul( oObj ) && $.isArray( oObj ) );
}
function $lisa(){ return xslib_is_array.apply( this, arguments ); }

function xslib_is_function( oObj )
{
	return ( oObj && ! $lisnul( oObj ) && $.isFunction( oObj ) );
}
function $lisfun(){ return xslib_is_function.apply( this, arguments ); }

function xslib_is_timestamp( nTimestamp )
{
	//	1325376000 is the timestamp of "2012-01-01 00:00:00"
	//	2145916800 is the timestamp of "2038-01-01 00:00:00"
	return ( $lisn( nTimestamp ) && nTimestamp > 1325376000 && nTimestamp < 2145916800 );
}
function $listm(){ return xslib_is_timestamp.apply( this, arguments ); }

function xslib_has_own( oObj, sKey )
{
	if ( ! $liso( oObj ) || 0 == $lslen( sKey, true ) ) 
	{
		return false;
	}
	return Object.prototype.hasOwnProperty.call( oObj, sKey );
}
function $lhasown(){ return xslib_has_own.apply( this, arguments ); }

function xslib_strlen( sString, bTrim )
{
	var nRet;
	var sNewString;

	if ( $lisnul( sString ) )
	{
		return 0;
	}

	nRet		= 0;
	sNewString	= new String( sString );
	if ( ! $lisnul( bTrim ) && bTrim )
	{
		nRet = $.trim( sNewString ).length;
	}
	else
	{
		nRet = sNewString.length;
	}

	return nRet;
}
function $lslen(){ return xslib_strlen.apply( this, arguments ); }

/**
 *	the length of jquery object
 */
function xslib_jlen( oObj )
{
	var nRet;

	//	...
	nRet = 0;

	if ( ! $lisnul( oObj ) && ( oObj instanceof jQuery ) )
	{
		//	oObj.length:
		//		The number of elements in the jQuery object.
		if ( ! $lisnul( oObj.length ) )
		{
			nRet = oObj.length;
		}
	}

	return nRet;
}
function $ljl(){ return xslib_jlen.apply( this, arguments ); }

//	Binary safe case-insensitive string comparison
function xslib_strcasecmp( sString1, sString2 )
{
	//
	//	RETURN	- 1 ( sString1 > sString2 ),
	//		  0 ( sString1 == sString2 ),
	//		 -1 ( sString1 < sString2 )
	//
	var sString1;
	var sString2;

	sString1 = ( new String( sString1 ) ).toLowerCase();
	sString2 = ( new String( sString2 ) ).toLowerCase();
	if ( sString1 > sString2 )
	{
		return 1;
	}
	else if ( sString1 == sString2 )
	{
		return 0;
	}

	return -1;
}
function $lscmp(){ return xslib_strcasecmp.apply( this, arguments ); }

function xslib_strncasecmp( sString1, sString2, nLength )
{
	//
	//	RETURN	-  < 0 if sString1 is less than sString2;
	//		   > 0 if sString1 is greater than sString2;
	//		  == 0 if they are equal.
	//
	var nDiff;
	var i;

	sString1 = ( sString1 + '' ).toLowerCase().substr( 0, nLength );
	sString2 = ( sString2 + '' ).toLowerCase().substr( 0, nLength );
	if ( sString1.length !== sString2.length )
	{
		if ( sString1.length < sString2.length )
		{
			nLength = sString1.length;
			if ( sString2.substr( 0, sString1.length ) == sString1 )
			{
				//	return the difference of chars
				return sString1.length - sString2.length;
			}
		}
		else
		{
			nLength = sString2.length;
			//	sString1 is longer than sString2
			if ( sString1.substr( 0, sString2.length ) == sString2 )
			{
				//	return the difference of chars
				return sString1.length - sString2.length;
			}
		}
	}
	else
	{
		//	Avoids trying to get a char that does not exist
		nLength = sString1.length;
	}

	for ( nDiff = 0, i = 0; i < nLength; i++ )
	{
		nDiff = sString1.charCodeAt( i ) - sString2.charCodeAt( i );
		if ( nDiff !== 0 )
		{
			return nDiff;
		}
	}

	return 0;
}
function $lsncmp(){ return xslib_strncasecmp.apply( this, arguments ); }

function xslib_array_to_object( ArrList, sItemKey )
{
	//
	//	ArrList		- [ {'key1':v1,'key2':v2,...}, ... ]
	//	sItemKey	- key1
	//	RETURN		- { v1 : {'key1':v1,'key2':v2,...} }
	//
	var oRet;
	var oItemData;
	var i;

	if ( $lisnul( ArrList ) ||
		! $lisa( ArrList ) ||
		$lisnul( ArrList.length ) ||
		0 == ArrList.length )
	{
		return {};
	}
	if ( 0 == $lslen( sItemKey, true ) )
	{
		return {};
	}

	//	...
	oRet = {};

	//	convert js array to object
	for ( i = 0; i < ArrList.length; i ++ )
	{
		//	...
		oItemData = ArrList[ i ];
		if ( ! $lisnul( oItemData ) &&
			! $lisnul( oItemData[ sItemKey ] ) )
		{
			//	{ 'mb_mid' : {object}, ... }
			oRet[ oItemData[ sItemKey ].toLowerCase() ] = oItemData;
		}
	}

	//	...
	return oRet;
}
function $lato(){ return xslib_array_to_object.apply( this, arguments ); }

function xslib_is_html_encoded( sString )
{
	if ( 0 == $lslen( sString, true ) )
	{
		return false;
	}
	return ( -1 == sString.indexOf("\"") && -1 == sString.indexOf("'") && -1 == sString.indexOf("<") && -1 == sString.indexOf(">") );
}
function $lishtmecd(){ return xslib_is_html_encoded.apply( this, arguments ); }

function xslib_html_encode( sString )
{
	if ( 0 == $lslen( sString, true ) )
	{
		return sString;
	}
	return $('<span>').text( sString ).html();
}
function $lhtmec(){ return xslib_html_encode.apply( this, arguments ); }

function xslib_html_decode( sString )
{
	if ( 0 == $lslen( sString, true ) )
	{
		return sString;
	}
	return $('<span>').html( sString ).text();
}
function $lhtmdc(){ return xslib_html_decode.apply( this, arguments ); }

function xslib_get_formated_html( sString )
{
	var sRet;

	if ( 0 == $lslen( sString, true ) )
	{
		return "";
	}

	sRet = ( new String( sString ) )
			.replace( " ", "&nbsp;" )
			.replace( /\r?\n|\r/g, "<br />" );
	return sRet;
}
function $lgfhtm(){ return xslib_get_formated_html.apply( this, arguments ); }

function xslib_parse_text_links( sHtml, oParam_ )
{
	//
	//	sHtml	- [in] html code
	//	oParam_	- [in]
	//		  {
	//			classes		: the list of class name
	//			target		: values('_blank','_media','_parent','_search','_self','_top')
	//			title		: the text of title
	//			tooltip		: the text of tooltip
	//		  }
	//
	//	RETURN	- new JQuery object
	//
	var sRet;
	var oRegexp;
	var sReplacedWith;
	var sClasses;
	var sTarget;
	var sTitle;
	var sTooltip;

	if ( ! $liss( sHtml ) )
	{
		return sHtml;
	}
	if ( 0 == $lslen( sHtml, true ) )
	{
		return "";
	}

	//	...
	sRet		= sHtml;
	oRegexp		= /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
	sReplacedWith	= "";
	sClasses	= "";
	sTarget		= "_self";
	sTitle		= "";
	sTooltip	= "";

	if ( undefined != oParam_ && 'object' == typeof oParam_ )
	{
		if ( oParam_.hasOwnProperty('classes') )
		{
			sClasses = oParam_['classes'];
		}
		if ( oParam_.hasOwnProperty('target') )
		{
			sTarget = oParam_['target'];
		}
		if ( oParam_.hasOwnProperty('title') )
		{
			sTitle = oParam_['title'];
		}
		if ( oParam_.hasOwnProperty('tooltip') )
		{
			sTooltip = oParam_['tooltip'];
		}
	}

	//
	//	replaced string
	//	
	sReplacedWith = "<a href=\"$1\" class=\"" + sClasses + "\" target=\"" + sTarget + "\" title=\"" + sTitle + "\" tooltip=\"" + sTooltip + "\">$1</a>";
	sRet = ( new String( sHtml ) ).replace( oRegexp, sReplacedWith );

	return sRet;
}
function $lptlk(){ return xslib_parse_text_links.apply( this, arguments ); }

function xslib_parse_url( sUrl )
{
	var oA;

	oA = document.createElement( "a" );
	if ( oA )
	{
		oA.href = sUrl;
	}
	return oA;
}
function $lpurl(){ return xslib_parse_url.apply( this, arguments ); }

function xslib_get_highlight_text( sOrgText, sKey )
{
	var sRet;
	var sDecodedText;
	var sFormatedKey;
	var sTextLowerCase;
	var sKeyLowerCase;
	var nStartPos;
	var sOrgKey;

	//	...
	sDecodedText	= sOrgText;
	sFormatedKey	= $lhtmec( sKey );

	//	...
	sRet = sDecodedText;

	//	...
	if ( $lslen( sDecodedText, true ) > 0 && $lslen( sFormatedKey ) > 0 )
	{
		sTextLowerCase	= $.trim( sDecodedText ).toLowerCase();
		sKeyLowerCase	= $.trim( sFormatedKey ).toLowerCase();

		//	...
		nStartPos = sTextLowerCase.indexOf( sKeyLowerCase );
		if ( nStartPos >= 0 )
		{
			sOrgKey = sDecodedText.substr( nStartPos, $lslen( sFormatedKey ) );
			if ( $lslen( sOrgKey ) > 0 )
			{
				sRet = sDecodedText.replace( sOrgKey, "<font class=\"highlight\">" + sOrgKey + "</font>" );
			}
		}
	}

	//	...
	return sRet;
}
function $lghtxt(){ return xslib_get_highlight_text.apply( this, arguments ); }

function xslib_rd( sUrl, nTimeout )
{
	//
	//	sUrl		- [in] URL
	//	nTimeout	- [in] Timeout
	//
	if ( nTimeout )
	{
		window.setTimeout
		(
			function()
			{
				window.location.href = ( sUrl ? sUrl : window.location.href );
			},
			nTimeout
		);
	}
	else
	{
		window.location.href = ( sUrl ? sUrl : window.location.href );
	}
}
function $lrd(){ return xslib_rd.apply( this, arguments ); }

function xslib_reload( bReloadSource )
{
	var bReloadFromServer;

	if ( ! $lisnul( bReloadSource ) )
	{
		bReloadFromServer = bReloadSource;
	}
	else
	{
		bReloadFromServer = false;
	}
	
	window.setTimeout(function()
	{
		window.location.reload( bReloadFromServer );
	},10 );
}
function $lrld(){ return xslib_reload.apply( this, arguments ); }

function xslib_obs_exec( pfnCallbackCondition, nMilliSeconds, pfnCallbackComplete )
{
	//	obsessively execute
	var nInterval;

	//	...
	nInterval = window.setInterval
	(
		function()
		{
			if ( pfnCallbackCondition() )
			{
				//	...
				window.clearInterval( nInterval );
				nInterval = 0;

				//	...
				if ( pfnCallbackComplete )
				{
					pfnCallbackComplete();
				}
			}
		},
		nMilliSeconds
	);
}
function $loe(){ return xslib_obs_exec.apply( this, arguments ); }

function xslib_print_r( theObj, vSpecTab )
{
	var sRet	= "";
	var vTab	= vSpecTab ? vSpecTab : "\t";
	var vTab2	= vTab.substr( 0, vTab.length - 1 );
	if ( theObj.constructor == Array || theObj.constructor == Object )
	{
		sRet += ( typeof( theObj ) + "\n" + vTab2 + "(\n" );
		for ( var p in theObj )
		{
			if ( theObj[p].constructor == Array || theObj[p].constructor == Object )
			{
				sRet += ( vTab + "[" + p + "] => " + typeof( theObj ) + " " );
				sRet += xslib_print_r( theObj[ p ], ( vTab + "\t" ) );
			}
			else
			{
				sRet += ( vTab + "[" + p + "] => " + theObj[ p ] + "\n" );
			}
		}
		sRet += ( vTab2 + ")\n" );
	}
	return sRet;
}
function $lpr(){ return xslib_print_r.apply( this, arguments ); }

function xslib_get_top_zindex( sSelector, nMaxLimit )
{
	var nRet;
	var nZIndex;
	var ArrZIndex = [];
	var nMaxZIndex;

	if ( '' == $.trim( sSelector ) )
	{
		return 0;
	}

	//	...
	nRet = 0;
	nMaxZIndex = $lisnul( nMaxLimit ) ? -1 : nMaxLimit;

	$( sSelector ).each(function()
	{
		nZIndex = parseInt( parseFloat( $(this).css("z-index") ) );
		if ( $.isNumeric( nZIndex ) )
		{
			if ( -1 != nMaxZIndex )
			{
				if ( nZIndex < nMaxZIndex )
				{
					ArrZIndex.push( nZIndex );
				}
			}
			else
			{
				ArrZIndex.push( nZIndex );
			}
		}
	});

	if ( ArrZIndex.length > 0 )
	{
		nRet = Math.max( 1, Math.max.apply( Math, ArrZIndex ) );
	}

	return nRet;
}
function $lgtzi(){ return xslib_get_top_zindex.apply( this, arguments ); }


function xslib_get_event_info( oEvent, bDebug )
{
	var oTarg;
	var sTagName;
	var sClassName;
	var sId;

	//	...
	sTagName	= "";
	sClassName	= "";
	sId		= "";

	try
	{
		if ( ! oEvent )
		{
			oEvent = window.event;
		}
		if ( oEvent.target )
		{
			oTarg = oEvent.target;
		}
		else if ( oEvent.srcElement )
		{
			oTarg = oEvent.srcElement;
		}

		if ( 3 == oTarg.nodeType )	// defeat Safari bug
		{
			oTarg = oTarg.parentNode;
		}
	}
	catch( err ){}

	if ( oTarg )
	{
		sTagName	= oTarg.tagName.toLowerCase();
		sClassName	= oTarg.className;
		sId		= oTarg.id.toLowerCase();
	}

	if ( bDebug )
	{
		alert( "tagName:" + sTagName + ", calssName:" + sClassName + ", id:" + sId );
	}

	return { "tagName" : sTagName, "className" : sClassName, "id" : sId, "obj" : oTarg };
}
function $lgevinf(){ return xslib_get_event_info.apply( this, arguments ); }

function xslib_is_valid_json_reponse( ojJsonData )
{
    var bRet;

    if ( ! ojJsonData || null == typeof ojJsonData )
    {
        return false;
    }

    //  ...
    bRet = false;

    if ( ojJsonData.hasOwnProperty('errorid') &&
		ojJsonData.hasOwnProperty('vdata') )
    {
        bRet = ( 0 == ojJsonData['errorid'] );
    }

    return bRet;
}
